import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateModuleEvaluationJobData } from '../types';
export declare class ModuleEvaluationHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateModuleEvaluationJobData>): Promise<{
        success: boolean;
        moduleNumber: number;
        result: string;
    }>;
}
