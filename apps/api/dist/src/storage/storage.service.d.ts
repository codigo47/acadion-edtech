import { ConfigService } from '@nestjs/config';
import { LocalStorageProvider } from './providers/local-storage.provider';
export declare class StorageService {
    private configService;
    private localProvider;
    private readonly provider;
    constructor(configService: ConfigService, localProvider: LocalStorageProvider);
    upload(file: Buffer, filename: string, mimetype: string): Promise<string>;
    delete(fileUrl: string): Promise<void>;
}
