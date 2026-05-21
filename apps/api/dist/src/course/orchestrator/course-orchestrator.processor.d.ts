import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseSSEService } from '../course-sse.service';
import { GenerateObjectivesJobData, GenerateIndexJobData, GenerateIntroUnitJobData, GenerateContentUnitJobData, GenerateModuleEvaluationJobData, GenerateCourseEvaluationJobData } from './types';
type JobData = GenerateObjectivesJobData | GenerateIndexJobData | GenerateIntroUnitJobData | GenerateContentUnitJobData | GenerateModuleEvaluationJobData | GenerateCourseEvaluationJobData;
export declare class CourseOrchestratorProcessor extends WorkerHost {
    private prisma;
    private sseService;
    private readonly logger;
    private readonly objectivesHandler;
    private readonly indexHandler;
    private readonly introUnitHandler;
    private readonly contentUnitHandler;
    private readonly moduleEvaluationHandler;
    private readonly courseEvaluationHandler;
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    process(job: Job<JobData>): Promise<any>;
}
export {};
