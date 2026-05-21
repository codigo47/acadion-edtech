import { ConfigService } from '@nestjs/config';
import { StorageProvider } from '../storage.interface';
export declare class LocalStorageProvider implements StorageProvider {
    private configService;
    private readonly logger;
    private readonly uploadDir;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    upload(file: Buffer, filename: string): Promise<string>;
    delete(fileUrl: string): Promise<void>;
}
