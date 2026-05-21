import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateContentUnitJobData } from '../types';
export declare class ContentUnitHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateContentUnitJobData>): Promise<{
        success: boolean;
        unitCode: string;
        result: string;
    }>;
}
