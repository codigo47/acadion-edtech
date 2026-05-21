import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateCourseEvaluationJobData } from '../types';
export declare class CourseEvaluationHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateCourseEvaluationJobData>): Promise<{
        success: boolean;
        result: string;
    }>;
}
