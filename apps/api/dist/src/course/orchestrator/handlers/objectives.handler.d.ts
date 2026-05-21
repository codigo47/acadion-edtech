import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateObjectivesJobData } from '../types';
export declare class ObjectivesHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateObjectivesJobData>): Promise<{
        success: boolean;
        objectives: {
            items: Array<{
                title: string;
                text: string;
            }>;
        };
    }>;
}
