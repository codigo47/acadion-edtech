import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseSSEService } from '../course-sse.service';
import { COURSE_ORCHESTRATION_QUEUE } from '../constants';
import {
  GenerateObjectivesJobData,
  GenerateIndexJobData,
  GenerateIntroUnitJobData,
  GenerateContentUnitJobData,
  GenerateModuleEvaluationJobData,
  GenerateCourseEvaluationJobData,
} from './types';
import {
  ObjectivesHandler,
  IndexHandler,
  IntroUnitHandler,
  ContentUnitHandler,
  ModuleEvaluationHandler,
  CourseEvaluationHandler,
} from './handlers';

type JobData =
  | GenerateObjectivesJobData
  | GenerateIndexJobData
  | GenerateIntroUnitJobData
  | GenerateContentUnitJobData
  | GenerateModuleEvaluationJobData
  | GenerateCourseEvaluationJobData;

@Processor(COURSE_ORCHESTRATION_QUEUE)
export class CourseOrchestratorProcessor extends WorkerHost {
  private readonly logger = new Logger(CourseOrchestratorProcessor.name);

  private readonly objectivesHandler: ObjectivesHandler;
  private readonly indexHandler: IndexHandler;
  private readonly introUnitHandler: IntroUnitHandler;
  private readonly contentUnitHandler: ContentUnitHandler;
  private readonly moduleEvaluationHandler: ModuleEvaluationHandler;
  private readonly courseEvaluationHandler: CourseEvaluationHandler;

  constructor(
    private prisma: PrismaService,
    private sseService: CourseSSEService,
  ) {
    super();
    this.objectivesHandler = new ObjectivesHandler(prisma, sseService);
    this.indexHandler = new IndexHandler(prisma, sseService);
    this.introUnitHandler = new IntroUnitHandler(prisma, sseService);
    this.contentUnitHandler = new ContentUnitHandler(prisma, sseService);
    this.moduleEvaluationHandler = new ModuleEvaluationHandler(
      prisma,
      sseService,
    );
    this.courseEvaluationHandler = new CourseEvaluationHandler(
      prisma,
      sseService,
    );
  }

  async process(job: Job<JobData>): Promise<any> {
    this.logger.log(`Processing job ${job.id} - ${job.name}`);

    switch (job.name) {
      case 'generate_objectives':
        return this.objectivesHandler.generate(
          job as Job<GenerateObjectivesJobData>,
        );

      case 'generate_index':
        return this.indexHandler.generate(job as Job<GenerateIndexJobData>);

      case 'generate_intro_unit':
        return this.introUnitHandler.generate(
          job as Job<GenerateIntroUnitJobData>,
        );

      case 'generate_content_unit':
        return this.contentUnitHandler.generate(
          job as Job<GenerateContentUnitJobData>,
        );

      case 'generate_module_evaluation':
        return this.moduleEvaluationHandler.generate(
          job as Job<GenerateModuleEvaluationJobData>,
        );

      case 'generate_course_evaluation':
        return this.courseEvaluationHandler.generate(
          job as Job<GenerateCourseEvaluationJobData>,
        );

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
        return null;
    }
  }
}
