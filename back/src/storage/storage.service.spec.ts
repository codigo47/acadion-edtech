import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { StorageService } from './storage.service';
import { LocalStorageProvider } from './providers/local-storage.provider';

const mockLocalProvider = {
  upload: jest.fn().mockResolvedValue('/api/v1/uploads/images/test.jpg'),
  delete: jest.fn().mockResolvedValue(undefined),
};
const mockConfigService = { get: jest.fn().mockReturnValue('local') };

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        { provide: LocalStorageProvider, useValue: mockLocalProvider },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    service = module.get<StorageService>(StorageService);
    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('delegates to the active provider and returns URL', async () => {
      const buffer = Buffer.from('fake-image');
      const result = await service.upload(buffer, 'test.jpg', 'image/jpeg');
      expect(mockLocalProvider.upload).toHaveBeenCalledWith(buffer, 'test.jpg', 'image/jpeg');
      expect(result).toBe('/api/v1/uploads/images/test.jpg');
    });
  });

  describe('delete', () => {
    it('delegates to the active provider', async () => {
      await service.delete('/api/v1/uploads/images/test.jpg');
      expect(mockLocalProvider.delete).toHaveBeenCalledWith('/api/v1/uploads/images/test.jpg');
    });
  });
});
