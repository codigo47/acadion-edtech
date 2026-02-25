import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadgeService } from '../badge/badge.service';
import { NotificationService } from '../notification/notification.service';
import {
  UpdateProgressDto,
  CompleteCourseDto,
  SubmitKnowledgeCheckDto,
  AdminEnrollDto,
} from './dto/lms.dto';

export interface ProposedUnit {
  code: string;
  title: string;
  bloomObjectives?: string;
}

export interface ProposedModule {
  number: number;
  title: string;
  units: ProposedUnit[];
}

export interface ProposedIndex {
  title: string;
  modules: ProposedModule[];
}

@Injectable()
export class LmsService {
  constructor(
    private prisma: PrismaService,
    private badgeService: BadgeService,
    private notificationService: NotificationService,
  ) {}

  async getStudentDashboard(userId: string) {
    // Auto-enroll user in their own completed courses that don't have enrollments yet
    const ownedWithoutEnrollment = await this.prisma.course.findMany({
      where: {
        userId,
        status: 'completed',
        enrollments: { none: { userId } },
      },
      select: { id: true },
    });

    if (ownedWithoutEnrollment.length > 0) {
      await this.prisma.enrollment.createMany({
        data: ownedWithoutEnrollment.map((c) => ({
          userId,
          courseId: c.id,
        })),
        skipDuplicates: true,
      });
    }

    // Enrolled courses (now includes auto-enrolled owned courses)
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            key: true,
            title: true,
            status: true,
            output: true,
            isAdaptive: true,
          },
        },
        unitProgress: true,
      },
      orderBy: { enrolledAt: 'desc' },
    });

    const enrolledCourses = enrollments.map((e) => {
      const output = e.course.output as { proposedIndex?: ProposedIndex } | null;
      const totalUnits = output?.proposedIndex?.modules?.reduce(
        (acc, m) => acc + m.units.length,
        0,
      ) ?? 0;
      const completedUnits = e.unitProgress.filter((u) => u.completedAt).length;
      const progress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

      let state: 'not_started' | 'in_progress' | 'completed' = 'not_started';
      if (e.completedAt) state = 'completed';
      else if (e.startedAt) state = 'in_progress';

      return {
        enrollmentId: e.id,
        courseKey: e.course.key,
        courseTitle: e.course.title,
        enrolledAt: e.enrolledAt,
        startedAt: e.startedAt,
        completedAt: e.completedAt,
        passed: e.passed,
        score: e.score,
        attempts: e.attempts,
        state,
        progress,
        totalUnits,
        completedUnits,
        isAdaptive: e.course.isAdaptive,
      };
    });

    // Sort: in_progress → not_started → completed
    const order = { in_progress: 0, not_started: 1, completed: 2 };
    enrolledCourses.sort((a, b) => order[a.state] - order[b.state]);

    // Learning plans
    const userPlans = await this.prisma.userLearningPlan.findMany({
      where: { userId },
      include: {
        learningPlan: {
          include: {
            courses: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    const learningPlans = userPlans.map((up) => {
      const planCourseIds = up.learningPlan.courses.map((c) => c.courseId);
      const completedPlanCourses = enrolledCourses.filter(
        (e) => planCourseIds.includes(e.enrollmentId) && e.state === 'completed',
      ).length;

      return {
        id: up.learningPlanId,
        key: up.learningPlan.key,
        name: up.learningPlan.name,
        description: up.learningPlan.description,
        image: up.learningPlan.image,
        estimatedDays: up.learningPlan.estimatedDays,
        isCorrelative: up.learningPlan.isCorrelative,
        enrolledAt: up.enrolledAt,
        deadline: up.deadline,
        completedAt: up.completedAt,
        totalCourses: planCourseIds.length,
        completedCourses: completedPlanCourses,
        badgeName: up.learningPlan.badgeName,
        badgeImage: up.learningPlan.badgeImage,
      };
    });

    return { enrolledCourses, learningPlans };
  }

  async getCourseContent(courseKey: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: {
        id: true,
        key: true,
        title: true,
        output: true,
        status: true,
        isAdaptive: true,
        userId: true,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    let enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
      include: { unitProgress: true },
    });

    // Auto-enroll if user owns the course
    if (!enrollment && course.userId === userId) {
      const created = await this.prisma.enrollment.create({
        data: { userId, courseId: course.id },
      });
      enrollment = { ...created, unitProgress: [] };
    }

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    // Get all components for this course
    const rawComponents = await this.prisma.courseComponent.findMany({
      where: { courseId: course.id },
      include: {
        component: {
          select: { internalName: true },
        },
      },
      orderBy: [{ module: 'asc' }, { unit: 'asc' }, { sequence: 'asc' }],
    });

    // Group components by unitCode (format: "module.unit")
    const componentsByUnit: Record<string, Array<{ component: string; content: unknown }>> = {};
    for (const c of rawComponents) {
      const unitCode = `${c.module}.${c.unit}`;
      if (!componentsByUnit[unitCode]) componentsByUnit[unitCode] = [];
      componentsByUnit[unitCode].push({
        component: c.component.internalName,
        content: c.data,
      });
    }

    const output = course.output as { proposedIndex?: ProposedIndex } | null;

    // Compute adaptive path if applicable
    let adaptivePath: Array<{ unitCode: string; mode: string }> | null = null;
    if (course.isAdaptive) {
      const assessments = await this.prisma.adaptiveAssessment.findMany({
        where: { enrollmentId: enrollment.id, type: 'pre' },
      });
      if (assessments.length > 0) {
        adaptivePath = assessments.map((a) => ({
          unitCode: a.unitCode,
          mode: this.confidenceToMode(a.confidenceScore),
        }));
      }
    }

    // Compute locked units for correlative courses
    const lockedUnits = this.computeLockedUnits(output?.proposedIndex ?? null, enrollment.unitProgress);

    return {
      courseKey: course.key,
      courseTitle: course.title,
      isAdaptive: course.isAdaptive,
      proposedIndex: output?.proposedIndex ?? null,
      componentsByUnit,
      enrollment: {
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt,
        startedAt: enrollment.startedAt,
        completedAt: enrollment.completedAt,
        passed: enrollment.passed,
        score: enrollment.score,
        attempts: enrollment.attempts,
      },
      unitProgress: enrollment.unitProgress,
      adaptivePath,
      lockedUnits,
    };
  }

  async updateProgress(
    courseKey: string,
    userId: string,
    dto: UpdateProgressDto,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true, output: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
      include: { unitProgress: true },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');

    // Mark as started if not yet
    if (!enrollment.startedAt) {
      await this.prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { startedAt: new Date() },
      });
    }

    // Upsert unit progress
    const existingProgress = enrollment.unitProgress.find(
      (p) => p.unitCode === dto.unitCode,
    );

    if (existingProgress) {
      await this.prisma.courseUnitProgress.update({
        where: { id: existingProgress.id },
        data: {
          timeSpentSeconds:
            existingProgress.timeSpentSeconds + dto.timeSpentSeconds,
          completedAt:
            dto.completed && !existingProgress.completedAt
              ? new Date()
              : existingProgress.completedAt,
          focusLossCount:
            dto.focusLossCount !== undefined
              ? existingProgress.focusLossCount + dto.focusLossCount
              : existingProgress.focusLossCount,
        },
      });
    } else {
      await this.prisma.courseUnitProgress.create({
        data: {
          enrollmentId: enrollment.id,
          unitCode: dto.unitCode,
          timeSpentSeconds: dto.timeSpentSeconds,
          completedAt: dto.completed ? new Date() : null,
          focusLossCount: dto.focusLossCount ?? 0,
        },
      });
    }

    // Calculate progress
    const output = course.output as { proposedIndex?: ProposedIndex } | null;
    const totalUnits =
      output?.proposedIndex?.modules?.reduce(
        (acc, m) => acc + m.units.length,
        0,
      ) ?? 0;

    const updatedProgress = await this.prisma.courseUnitProgress.findMany({
      where: { enrollmentId: enrollment.id },
    });
    const completedUnits = updatedProgress.filter((u) => u.completedAt).length;
    const progress =
      totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    return { progress, completedUnits, totalUnits };
  }

  async completeCourse(
    courseKey: string,
    userId: string,
    dto: CompleteCourseDto,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true, orgId: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');

    const updated = await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        completedAt: new Date(),
        passed: dto.passed,
        score: dto.score,
        attempts: enrollment.attempts + 1,
      },
    });

    // Send notification
    const notificationType = dto.passed ? 'course_completed' : 'course_failed';
    await this.notificationService.create(userId, notificationType as any, {
      message: dto.passed ? 'You passed the course!' : 'Course completed but not passed.',
      courseId: course.id,
      courseKey,
      score: dto.score,
    });

    // Evaluate badges
    await this.badgeService.evaluateAndGrantBadges(userId, {
      type: 'course_completed',
      courseId: course.id,
      score: dto.score,
      orgId: course.orgId ?? undefined,
    });

    return updated;
  }

  async selfEnroll(courseKey: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey, status: 'completed' },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found or not available');

    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (existing) return existing;

    return this.prisma.enrollment.create({
      data: { userId, courseId: course.id },
    });
  }

  async adminEnroll(courseKey: string, dto: AdminEnrollDto) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: dto.userId, courseId: course.id } },
    });
    if (existing) return existing;

    const enrollment = await this.prisma.enrollment.create({
      data: { userId: dto.userId, courseId: course.id },
    });

    await this.notificationService.create(dto.userId, 'enrolled', {
      message: 'You have been enrolled in a new course.',
      courseKey,
    });

    return enrollment;
  }

  async adminReEnroll(courseKey: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');

    // Reset enrollment
    const updated = await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        startedAt: null,
        completedAt: null,
        passed: null,
        score: null,
        attempts: enrollment.attempts,
      },
    });

    // Clear unit progress
    await this.prisma.courseUnitProgress.deleteMany({
      where: { enrollmentId: enrollment.id },
    });

    // Clear adaptive assessments
    await this.prisma.adaptiveAssessment.deleteMany({
      where: { enrollmentId: enrollment.id },
    });

    await this.notificationService.create(userId, 'enrolled', {
      message: 'You have been re-enrolled in a course.',
      courseKey,
    });

    return updated;
  }

  async submitKnowledgeCheck(
    courseKey: string,
    userId: string,
    dto: SubmitKnowledgeCheckDto,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');

    // Get current attempt count for this question
    const existingAttempts = await this.prisma.knowledgeCheckAttempt.count({
      where: {
        enrollmentId: enrollment.id,
        unitCode: dto.unitCode,
        questionIndex: dto.questionIndex,
      },
    });

    const maxAttempts = 3;
    if (existingAttempts >= maxAttempts) {
      throw new BadRequestException('Maximum attempts reached for this question');
    }

    const attempt = await this.prisma.knowledgeCheckAttempt.create({
      data: {
        enrollmentId: enrollment.id,
        unitCode: dto.unitCode,
        questionIndex: dto.questionIndex,
        answer: dto.answer as any,
        isCorrect: dto.isCorrect,
        attemptNumber: existingAttempts + 1,
      },
    });

    return {
      attemptNumber: attempt.attemptNumber,
      isCorrect: attempt.isCorrect,
      remainingAttempts: maxAttempts - attempt.attemptNumber,
    };
  }

  private computeLockedUnits(
    proposedIndex: ProposedIndex | null,
    unitProgress: Array<{ unitCode: string; completedAt: Date | null }>,
  ): string[] {
    if (!proposedIndex) return [];

    const completedCodes = new Set(
      unitProgress.filter((p) => p.completedAt).map((p) => p.unitCode),
    );

    const allUnits = proposedIndex.modules.flatMap((m) =>
      m.units.map((u) => u.code),
    );

    const locked: string[] = [];
    for (let i = 1; i < allUnits.length; i++) {
      const prevCode = allUnits[i - 1];
      if (!completedCodes.has(prevCode)) {
        // All subsequent units are locked
        for (let j = i; j < allUnits.length; j++) {
          if (!completedCodes.has(allUnits[j])) {
            locked.push(allUnits[j]);
          }
        }
        break;
      }
    }

    return locked;
  }

  private confidenceToMode(score: number): string {
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
