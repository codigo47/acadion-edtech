import { StorageService } from './storage.service';
export declare class UploadController {
    private storageService;
    constructor(storageService: StorageService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
