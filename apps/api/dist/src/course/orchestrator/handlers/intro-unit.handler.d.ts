import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateIntroUnitJobData } from '../types';
export declare class IntroUnitHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateIntroUnitJobData>): Promise<{
        success: boolean;
        unitCode: string;
        result: string;
    }>;
}
