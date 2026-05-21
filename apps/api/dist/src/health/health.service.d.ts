import { PrismaService } from '../prisma/prisma.service';
export declare class HealthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        postgres: {
            connected: boolean;
            version: string;
            error?: undefined;
        };
    } | {
        status: string;
        postgres: {
            connected: boolean;
            error: string;
            version?: undefined;
        };
    }>;
}
