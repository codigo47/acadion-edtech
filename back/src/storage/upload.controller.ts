import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private storageService: StorageService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, callback) => {
        if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException(`File type ${file.mimetype} not allowed`), false);
        }
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const ext = extname(file.originalname) || '.jpg';
    const filename = `${uuidv4()}${ext}`;
    const url = await this.storageService.upload(file.buffer, filename, file.mimetype);

    return { url };
  }
}
