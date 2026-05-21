import { ConversationService } from './conversation.service';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    findOne(conversationKey: string): Promise<{
        messages: {
            sequence: string;
            role: import("@prisma/client").$Enums.MessageRole;
            id: string;
            createdAt: Date;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            conversationId: string;
            content: string;
            modelName: string | null;
            tokensUsed: number | null;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        isArchived: boolean;
        courseId: number | null;
    }>;
}
