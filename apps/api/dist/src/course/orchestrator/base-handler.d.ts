import { Logger } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseSSEService } from '../course-sse.service';
export declare abstract class BaseHandler {
    protected readonly prisma: PrismaService;
    protected readonly sseService: CourseSSEService;
    protected readonly logger: Logger;
    protected readonly llm: ChatOpenAI;
    constructor(prisma: PrismaService, sseService: CourseSSEService, loggerContext: string);
    protected createMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string): Promise<{
        role: import("@prisma/client").$Enums.MessageRole;
        id: string;
        createdAt: Date;
        metadata: Prisma.JsonValue | null;
        conversationId: string;
        content: string;
        sequence: number;
        modelName: string | null;
        tokensUsed: number | null;
    }>;
    protected getUnitProgress(courseId: number): Promise<{
        totalUnits: number;
        completedUnits: number;
        failedUnits: number;
        runningUnits: number;
        pendingUnits: number;
    }>;
    protected checkAndEmitGenerationComplete(courseId: number, courseKey: string): Promise<void>;
    protected parseUnitCode(unitCode: string): {
        module: number;
        unit: number;
    };
    protected saveComponents(courseId: number, userId: string, unitCode: string, resultJson: string): Promise<void>;
}
