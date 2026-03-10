import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { StorageService } from './storage.service';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid-1234' }));

const mockStorageService = {
  upload: jest.fn().mockResolvedValue('/api/v1/uploads/images/abc.jpg'),
};

describe('UploadController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [{ provide: StorageService, useValue: mockStorageService }],
    }).compile();
    controller = module.get<UploadController>(UploadController);
    jest.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('uploads file and returns URL', async () => {
      const mockFile = {
        buffer: Buffer.from('fake'),
        originalname: 'photo.jpg',
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const result = await controller.uploadImage(mockFile);
      expect(mockStorageService.upload).toHaveBeenCalled();
      expect(result).toEqual({ url: '/api/v1/uploads/images/abc.jpg' });
    });

    it('throws BadRequestException when no file provided', async () => {
      await expect(controller.uploadImage(undefined as any)).rejects.toThrow(BadRequestException);
    });
  });
});
