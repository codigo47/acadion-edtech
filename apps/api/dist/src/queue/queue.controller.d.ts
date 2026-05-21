import { QueueService } from './queue.service';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    getStats(): Promise<{
        success: boolean;
        stats: {
            queue: string;
            waiting: number;
            active: number;
            completed: number;
            failed: number;
            delayed: number;
        };
    }>;
}
