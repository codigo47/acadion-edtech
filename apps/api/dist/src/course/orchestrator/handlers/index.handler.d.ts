import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateIndexJobData } from '../types';
export declare class IndexHandler extends BaseHandler {
    constructor(prisma: PrismaService, sseService: CourseSSEService);
    generate(job: Job<GenerateIndexJobData>): Promise<{
        success: boolean;
        proposedIndex: {
            modules: {
                units: {
                    code: string;
                    title: string;
                }[];
                number: number;
                title: string;
            }[];
            title: string;
        };
    }>;
}
