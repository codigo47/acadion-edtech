import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ProposedUnit {
  code: string;
  title: string;
  bloomObjectives?: string;
}

interface ProposedModule {
  number: number;
  title: string;
  units: ProposedUnit[];
}

interface ProposedIndex {
  title: string;
  modules: ProposedModule[];
}

export interface AdaptivePath {
  unitCode: string;
  unitTitle: string;
  confidenceScore: number;
  /** skip = skip entirely, check_only = knowledge check only, full = full content, extended = content + extra, deep = content + more exercises + extended check */
  mode: 'skip' | 'check_only' | 'full' | 'extended' | 'deep';
}

@Injectable()
export class AdaptiveService {
  constructor(private prisma: PrismaService) {}

  async getPreAssessment(courseKey: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true, key: true, title: true, output: true, isAdaptive: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (!course.isAdaptive) throw new BadRequestException('Course is not adaptive');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');

    // Check if pre-assessment already done
    const existing = await this.prisma.adaptiveAssessment.findFirst({
      where: { enrollmentId: enrollment.id, type: 'pre' },
    });
    if (existing) {
      return { alreadyCompleted: true, enrollmentId: enrollment.id };
    }

    const output = course.output as { proposedIndex?: ProposedIndex } | null;
    const units = output?.proposedIndex?.modules?.flatMap((m) =>
      m.units.map((u) => ({ code: u.code, title: u.title, moduleTitle: m.title })),
    ) ?? [];

    return {
      alreadyCompleted: false,
      enrollmentId: enrollment.id,
      courseTitle: course.title,
      units: units.map((u) => ({
        unitCode: u.code,
        unitTitle: u.title,
        moduleTitle: u.moduleTitle,
        question: `How confident are you with "${u.title}"?`,
      })),
    };
  }

  async submitPreAssessment(
    enrollmentId: number,
    userId: string,
    answers: Array<{ unitCode: string; confidenceScore: number }>,
  ) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: { select: { id: true, isAdaptive: true, output: true } } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.userId !== userId) throw new ForbiddenException('Not your enrollment');
    if (!enrollment.course.isAdaptive) throw new BadRequestException('Course is not adaptive');

    // Check not already submitted
    const existing = await this.prisma.adaptiveAssessment.findFirst({
      where: { enrollmentId, type: 'pre' },
    });
    if (existing) throw new BadRequestException('Pre-assessment already submitted');

    // Validate scores are 1-5
    for (const a of answers) {
      if (a.confidenceScore < 1 || a.confidenceScore > 5) {
        throw new BadRequestException('Confidence score must be between 1 and 5');
      }
    }

    // Store assessments
    await this.prisma.adaptiveAssessment.createMany({
      data: answers.map((a) => ({
        enrollmentId,
        type: 'pre' as const,
        unitCode: a.unitCode,
        confidenceScore: a.confidenceScore,
      })),
    });

    // Compute adaptive path
    const path = this.computeAdaptivePath(answers);

    // For units with score 5 (skip), mark them as completed
    for (const p of path) {
      if (p.mode === 'skip') {
        await this.prisma.courseUnitProgress.upsert({
          where: { enrollmentId_unitCode: { enrollmentId, unitCode: p.unitCode } },
          create: {
            enrollmentId,
            unitCode: p.unitCode,
            completedAt: new Date(),
            timeSpentSeconds: 0,
          },
          update: {
            completedAt: new Date(),
          },
        });
      }
    }

    // Mark as started if not yet
    if (!enrollment.startedAt) {
      await this.prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { startedAt: new Date() },
      });
    }

    return { path };
  }

  async getAdaptivePath(enrollmentId: number, userId: string): Promise<AdaptivePath[]> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: { select: { output: true, isAdaptive: true } } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.userId !== userId) throw new ForbiddenException('Not your enrollment');

    const assessments = await this.prisma.adaptiveAssessment.findMany({
      where: { enrollmentId, type: 'pre' },
    });

    if (assessments.length === 0) return [];

    const output = enrollment.course.output as { proposedIndex?: ProposedIndex } | null;
    const units = output?.proposedIndex?.modules?.flatMap((m) =>
      m.units.map((u) => ({ code: u.code, title: u.title })),
    ) ?? [];

    return assessments.map((a) => {
      const unit = units.find((u) => u.code === a.unitCode);
      return {
        unitCode: a.unitCode,
        unitTitle: unit?.title ?? a.unitCode,
        confidenceScore: a.confidenceScore,
        mode: this.confidenceToMode(a.confidenceScore),
      };
    });
  }

  async getPostAssessment(courseKey: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true, output: true, isAdaptive: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (!course.isAdaptive) throw new BadRequestException('Course is not adaptive');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled');

    const preAssessments = await this.prisma.adaptiveAssessment.findMany({
      where: { enrollmentId: enrollment.id, type: 'pre' },
    });

    const postExisting = await this.prisma.adaptiveAssessment.findFirst({
      where: { enrollmentId: enrollment.id, type: 'post' },
    });

    const output = course.output as { proposedIndex?: ProposedIndex } | null;
    const units = output?.proposedIndex?.modules?.flatMap((m) =>
      m.units.map((u) => ({ code: u.code, title: u.title, moduleTitle: m.title })),
    ) ?? [];

    return {
      alreadyCompleted: !!postExisting,
      enrollmentId: enrollment.id,
      units: units.map((u) => {
        const pre = preAssessments.find((a) => a.unitCode === u.code);
        return {
          unitCode: u.code,
          unitTitle: u.title,
          moduleTitle: u.moduleTitle,
          preScore: pre?.confidenceScore ?? null,
          question: `How confident are you now with "${u.title}"?`,
        };
      }),
    };
  }

  async submitPostAssessment(
    enrollmentId: number,
    userId: string,
    answers: Array<{ unitCode: string; confidenceScore: number }>,
  ) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.userId !== userId) throw new ForbiddenException('Not your enrollment');

    for (const a of answers) {
      if (a.confidenceScore < 1 || a.confidenceScore > 5) {
        throw new BadRequestException('Confidence score must be between 1 and 5');
      }
    }

    // Store post assessments
    await this.prisma.adaptiveAssessment.createMany({
      data: answers.map((a) => ({
        enrollmentId,
        type: 'post' as const,
        unitCode: a.unitCode,
        confidenceScore: a.confidenceScore,
      })),
    });

    // Compute improvement
    const preAssessments = await this.prisma.adaptiveAssessment.findMany({
      where: { enrollmentId, type: 'pre' },
    });

    const comparison = answers.map((post) => {
      const pre = preAssessments.find((a) => a.unitCode === post.unitCode);
      const preScore = pre?.confidenceScore ?? 0;
      const improvement = post.confidenceScore - preScore;
      return {
        unitCode: post.unitCode,
        preScore,
        postScore: post.confidenceScore,
        improvement,
      };
    });

    const avgPreScore = comparison.reduce((s, c) => s + c.preScore, 0) / (comparison.length || 1);
    const avgPostScore = comparison.reduce((s, c) => s + c.postScore, 0) / (comparison.length || 1);
    const overallImprovement = Math.round(((avgPostScore - avgPreScore) / (5 - avgPreScore || 1)) * 100);

    return {
      comparison,
      avgPreScore: Math.round(avgPreScore * 10) / 10,
      avgPostScore: Math.round(avgPostScore * 10) / 10,
      overallImprovement,
    };
  }

  private computeAdaptivePath(
    answers: Array<{ unitCode: string; confidenceScore: number }>,
  ): AdaptivePath[] {
    return answers.map((a) => ({
      unitCode: a.unitCode,
      unitTitle: '',
      confidenceScore: a.confidenceScore,
      mode: this.confidenceToMode(a.confidenceScore),
    }));
  }

  private confidenceToMode(score: number): AdaptivePath['mode'] {
    switch (score) {
      case 5: return 'skip';
      case 4: return 'check_only';
      case 3: return 'full';
      case 2: return 'extended';
      case 1: return 'deep';
      default: return 'full';
    }
  }
}
