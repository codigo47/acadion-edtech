import { Logger } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseSSEService } from '../course-sse.service';

export abstract class BaseHandler {
  protected readonly logger: Logger;
  protected readonly llm: ChatOpenAI;

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly sseService: CourseSSEService,
    loggerContext: string,
  ) {
    this.logger = new Logger(loggerContext);
    this.llm = new ChatOpenAI({
      model: 'gpt-5',
      temperature: 1,
      verbose: true,
    });
  }

  protected async createMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
  ) {
    const lastMessage = await this.prisma.message.findFirst({
      where: { conversationId },
      orderBy: { sequence: 'desc' },
      select: { sequence: true },
    });
    const sequence = Number(lastMessage?.sequence ?? 0) + 1;
    return this.prisma.message.create({
      data: {
        conversationId,
        role,
        content,
        sequence,
      },
    });
  }

  protected async getUnitProgress(courseId: number) {
    const steps = await this.prisma.courseStep.findMany({
      where: {
        courseId,
        type: {
          in: [
            'generating_intro_unit',
            'generating_content_unit',
            'generating_module_evaluation',
            'generating_course_evaluation',
          ],
        },
      },
    });

    const totalUnits = steps.length;
    const completedUnits = steps.filter((s) => s.status === 'completed').length;
    const failedUnits = steps.filter((s) => s.status === 'failed').length;
    const runningUnits = steps.filter((s) => s.status === 'running').length;
    const pendingUnits = steps.filter((s) => s.status === 'pending').length;

    return {
      totalUnits,
      completedUnits,
      failedUnits,
      runningUnits,
      pendingUnits,
    };
  }

  protected async checkAndEmitGenerationComplete(
    courseId: number,
    courseKey: string,
  ) {
    const progress = await this.getUnitProgress(courseId);

    // Check if all units are completed (no pending or running)
    if (
      progress.pendingUnits === 0 &&
      progress.runningUnits === 0 &&
      progress.completedUnits > 0
    ) {
      // Update course status to completed
      await this.prisma.course.update({
        where: { id: courseId },
        data: { status: 'completed' },
      });

      this.sseService.emitGenerationComplete(courseKey);
      this.logger.log(`Course ${courseId} generation completed`);
    }
  }

  /**
   * Parse unit code to get module and unit numbers
   * @param unitCode - Format "1.1", "2.3", etc. or "eval-m1" for module eval, "final-evaluation" for course eval
   */
  protected parseUnitCode(unitCode: string): { module: number; unit: number } {
    if (unitCode.startsWith('eval-m')) {
      const moduleNum = parseInt(unitCode.replace('eval-m', ''), 10);
      return { module: moduleNum, unit: 99 }; // Use 99 for module evaluation
    }
    if (unitCode === 'final-evaluation') {
      return { module: 99, unit: 99 }; // Use 99,99 for course evaluation
    }
    const [moduleStr, unitStr] = unitCode.split('.');
    return {
      module: parseInt(moduleStr, 10),
      unit: parseInt(unitStr, 10),
    };
  }

  /**
   * Save generated components to the CourseComponent table
   * @param courseId - Course ID
   * @param userId - User ID who owns the course
   * @param unitCode - Unit code (e.g., "1.1", "eval-m1", "final-evaluation")
   * @param resultJson - JSON string of components array from LLM
   */
  protected async saveComponents(
    courseId: number,
    userId: string,
    unitCode: string,
    resultJson: string,
  ): Promise<void> {
    try {
      // Parse the result JSON
      const components = JSON.parse(resultJson) as Array<{
        component: string;
        props?: Record<string, unknown>;
        content?: Record<string, unknown>;
      }>;

      if (!Array.isArray(components)) {
        this.logger.warn(`Invalid components format for unit ${unitCode}`);
        return;
      }

      // Get module and unit numbers from unit code
      const { module, unit } = this.parseUnitCode(unitCode);

      // Build a map of component internalName to id
      const allComponents = await this.prisma.component.findMany({
        select: { id: true, internalName: true },
      });
      const componentMap = new Map(
        allComponents.map((c) => [c.internalName, c.id]),
      );

      // Create course components
      const courseComponents = components.map((comp, index) => {
        const componentId = componentMap.get(comp.component);
        if (!componentId) {
          this.logger.warn(
            `Component ${comp.component} not found in database for unit ${unitCode}`,
          );
          return null;
        }

        // Use props or content as the data
        const data = (comp.props || comp.content || {}) as Prisma.InputJsonValue;

        return {
          courseId,
          componentId,
          module,
          unit,
          sequence: index + 1,
          data,
          userId,
        };
      });

      // Filter out null entries (components not found)
      const validComponents = courseComponents.filter(
        (c): c is NonNullable<typeof c> => c !== null,
      );

      if (validComponents.length > 0) {
        await this.prisma.courseComponent.createMany({
          data: validComponents,
        });
        this.logger.log(
          `Saved ${validComponents.length} components for unit ${unitCode}`,
        );
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to save components for unit ${unitCode}: ${err.message}`,
      );
      // Don't throw - we don't want to fail the entire job if component saving fails
    }
  }
}
