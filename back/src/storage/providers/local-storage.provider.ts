import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { mkdir, writeFile, unlink } from 'fs/promises';
import { StorageProvider } from '../storage.interface';

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly logger = new Logger(LocalStorageProvider.name);
  private readonly uploadDir = join(process.cwd(), 'uploads', 'images');
  private readonly urlPrefix = '/api/v1/uploads/images';

  async upload(file: Buffer, filename: string): Promise<string> {
    await mkdir(this.uploadDir, { recursive: true });
    const filePath = join(this.uploadDir, filename);
    await writeFile(filePath, file);
    this.logger.log(`Saved image: ${filename}`);
    return `${this.urlPrefix}/${filename}`;
  }

  async delete(fileUrl: string): Promise<void> {
    const filename = fileUrl.split('/').pop();
    if (!filename) return;
    const filePath = join(this.uploadDir, filename);
    try {
      await unlink(filePath);
      this.logger.log(`Deleted image: ${filename}`);
    } catch {
      this.logger.warn(`File not found for deletion: ${filename}`);
    }
  }
}
