import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { StorageProvider } from './storage.interface';

@Injectable()
export class StorageService {
  private readonly provider: StorageProvider;

  constructor(
    private configService: ConfigService,
    private localProvider: LocalStorageProvider,
  ) {
    const providerName = this.configService.get<string>('STORAGE_PROVIDER', 'local');
    switch (providerName) {
      case 'local':
      default:
        this.provider = this.localProvider;
    }
  }

  async upload(file: Buffer, filename: string, mimetype: string): Promise<string> {
    return this.provider.upload(file, filename, mimetype);
  }

  async delete(fileUrl: string): Promise<void> {
    return this.provider.delete(fileUrl);
  }
}
