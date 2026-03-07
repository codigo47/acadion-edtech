# Image Storage Abstraction — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace base64 data URLs in the database with server-hosted image files, using a swappable storage provider (local now, S3 later).

**Architecture:** A NestJS `StorageModule` with a `StorageProvider` interface and a `LocalStorageProvider` implementation. A generic `POST /uploads/image` endpoint receives multipart uploads, delegates to the active provider, and returns a public URL. The frontend converts cropped data URLs to blobs and uploads them before saving to component data.

**Tech Stack:** NestJS 11, Multer (via `@nestjs/platform-express`), Express static middleware, React Query mutation, FormData API.

---

### Task 1: Install multer types

**Files:**
- Modify: `back/package.json`

**Step 1: Install `@types/multer` and `uuid`**

Run:
```bash
cd back && npm install uuid && npm install -D @types/multer @types/uuid
```

`@nestjs/platform-express` already includes multer. We only need the types for TypeScript and `uuid` for generating unique filenames.

**Step 2: Commit**

```bash
git add back/package.json back/package-lock.json
git commit -m "chore: add uuid and multer types for image upload support"
```

---

### Task 2: Create StorageProvider interface and LocalStorageProvider

**Files:**
- Create: `back/src/storage/storage.interface.ts`
- Create: `back/src/storage/providers/local-storage.provider.ts`

**Step 1: Create the interface**

Create `back/src/storage/storage.interface.ts`:

```typescript
export interface StorageProvider {
  upload(file: Buffer, filename: string, mimetype: string): Promise<string>;
  delete(fileUrl: string): Promise<void>;
}
```

**Step 2: Create LocalStorageProvider**

Create `back/src/storage/providers/local-storage.provider.ts`:

```typescript
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
```

**Step 3: Commit**

```bash
git add back/src/storage/storage.interface.ts back/src/storage/providers/local-storage.provider.ts
git commit -m "feat: add StorageProvider interface and LocalStorageProvider"
```

---

### Task 3: Create StorageService

**Files:**
- Create: `back/src/storage/storage.service.ts`
- Test: `back/src/storage/storage.service.spec.ts`

**Step 1: Write the test**

Create `back/src/storage/storage.service.spec.ts`:

```typescript
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
```

**Step 2: Run test to verify it fails**

Run: `cd back && npx jest src/storage/storage.service.spec.ts --no-cache`
Expected: FAIL — module `StorageService` not found.

**Step 3: Write the implementation**

Create `back/src/storage/storage.service.ts`:

```typescript
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
```

**Step 4: Run test to verify it passes**

Run: `cd back && npx jest src/storage/storage.service.spec.ts --no-cache`
Expected: PASS

**Step 5: Commit**

```bash
git add back/src/storage/storage.service.ts back/src/storage/storage.service.spec.ts
git commit -m "feat: add StorageService with provider delegation"
```

---

### Task 4: Create UploadController and StorageModule

**Files:**
- Create: `back/src/storage/upload.controller.ts`
- Create: `back/src/storage/upload.controller.spec.ts`
- Create: `back/src/storage/storage.module.ts`

**Step 1: Write the controller test**

Create `back/src/storage/upload.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { StorageService } from './storage.service';

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
```

**Step 2: Run test to verify it fails**

Run: `cd back && npx jest src/storage/upload.controller.spec.ts --no-cache`
Expected: FAIL — module not found.

**Step 3: Write the controller**

Create `back/src/storage/upload.controller.ts`:

```typescript
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
```

**Step 4: Write the module**

Create `back/src/storage/storage.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [StorageService, LocalStorageProvider],
  exports: [StorageService],
})
export class StorageModule {}
```

**Step 5: Run test to verify it passes**

Run: `cd back && npx jest src/storage/upload.controller.spec.ts --no-cache`
Expected: PASS

**Step 6: Commit**

```bash
git add back/src/storage/upload.controller.ts back/src/storage/upload.controller.spec.ts back/src/storage/storage.module.ts
git commit -m "feat: add UploadController and StorageModule"
```

---

### Task 5: Register StorageModule and serve static uploads

**Files:**
- Modify: `back/src/app.module.ts`
- Modify: `back/src/main.ts`

**Step 1: Add StorageModule to AppModule**

In `back/src/app.module.ts`, add import and register:

```typescript
import { StorageModule } from './storage/storage.module';
// ...
imports: [
  // ... existing imports
  StorageModule,
],
```

**Step 2: Serve static files in main.ts**

In `back/src/main.ts`, add express static middleware after the app is created:

```typescript
import { join } from 'path';
import * as express from 'express';

// After app.setGlobalPrefix('api/v1'):
app.use('/api/v1/uploads', express.static(join(process.cwd(), 'uploads')));
```

**Step 3: Add `uploads/` to `.gitignore`**

Append to `back/.gitignore` (create if it doesn't exist):

```
uploads/
```

**Step 4: Verify backend starts**

Run: `cd back && npm run build`
Expected: Compiles without errors.

**Step 5: Commit**

```bash
git add back/src/app.module.ts back/src/main.ts back/.gitignore
git commit -m "feat: register StorageModule and serve uploaded files statically"
```

---

### Task 6: Add `upload` method to frontend api-client

**Files:**
- Modify: `web/lib/api-client.ts`

**Step 1: Modify the `request` function to support raw body (FormData)**

In `web/lib/api-client.ts`, update the `RequestOptions` interface and `request` function:

The `RequestOptions` interface needs a `raw` boolean. When `raw` is true:
- Don't set `Content-Type: application/json` (let browser set the multipart boundary)
- Don't `JSON.stringify` the body — pass it directly

```typescript
interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean;
  raw?: boolean;  // <-- add this
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, raw = false, headers: customHeaders, ...restOptions } = options;

  const headers: HeadersInit = {
    ...(raw ? {} : { 'Content-Type': 'application/json' }),
    ...customHeaders,
  };

  // ... auth token injection stays the same ...

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...restOptions,
    headers,
    body: raw ? (body as BodyInit) : body ? JSON.stringify(body) : undefined,
  });

  // ... error handling stays the same ...
}
```

**Step 2: Add the `upload` method to the `api` object**

```typescript
export const api = {
  // ... existing methods stay the same ...

  upload: <T>(endpoint: string, file: Blob, fieldName = 'file') => {
    const formData = new FormData();
    formData.append(fieldName, file);
    return request<T>(endpoint, { method: 'POST', body: formData, raw: true });
  },
};
```

**Step 3: Commit**

```bash
git add web/lib/api-client.ts
git commit -m "feat: add upload method with multipart support to api-client"
```

---

### Task 7: Create `useUploadImage` hook

**Files:**
- Create: `web/lib/hooks/use-upload.ts`

**Step 1: Create the hook**

Create `web/lib/hooks/use-upload.ts`:

```typescript
import { useMutation } from '@tanstack/react-query';
import { api } from '../api-client';

export function useUploadImage() {
  return useMutation({
    mutationFn: (file: Blob) =>
      api.upload<{ url: string }>('/uploads/image', file),
  });
}
```

**Step 2: Commit**

```bash
git add web/lib/hooks/use-upload.ts
git commit -m "feat: add useUploadImage hook"
```

---

### Task 8: Update ImagePickerModal to upload cropped images

**Files:**
- Modify: `web/app/project/[courseKey]/_components/ImagePickerModal.tsx`

This is the key integration point. The modal needs to:
1. Detect when a crop result is a data URL (base64)
2. Convert it to a Blob
3. Upload it via `useUploadImage`
4. Pass the server URL (not the data URL) to `onSelect`

**Step 1: Add the data-URL-to-blob helper and upload logic**

Modify `ImagePickerModal.tsx`:

Add helper function before the component:

```typescript
function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bytes = atob(base64);
  const array = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    array[i] = bytes.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}
```

Add imports:

```typescript
import { useUploadImage } from '@/lib/hooks/use-upload';
import { useToast } from '@/app/components/ToastProvider';
```

Inside the component, add:

```typescript
const uploadImage = useUploadImage();
const { showToast } = useToast();
const [isUploading, setIsUploading] = useState(false);
```

Replace `handleCropComplete`:

```typescript
const handleCropComplete = useCallback(async (
  croppedArea: { x: number; y: number; width: number; height: number },
  croppedDataUrl?: string,
) => {
  if (!cropImage) return;

  const imageToUpload = croppedDataUrl || cropImage;

  // If it's a data URL, upload it to the server
  if (imageToUpload.startsWith('data:')) {
    setIsUploading(true);
    try {
      const blob = dataUrlToBlob(imageToUpload);
      const { url } = await uploadImage.mutateAsync(blob);
      onSelect(url, {
        x: croppedArea.x,
        y: croppedArea.y,
        width: croppedArea.width,
        height: croppedArea.height,
      });
      onClose();
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
    return;
  }

  // External URL — pass through directly
  onSelect(imageToUpload, {
    x: croppedArea.x,
    y: croppedArea.y,
    width: croppedArea.width,
    height: croppedArea.height,
  });
  onClose();
}, [cropImage, onSelect, onClose, uploadImage, showToast]);
```

Pass `isUploading` to `ImageCropModal` to disable the Apply button during upload. Add to the `ImageCropModal` render:

```tsx
<ImageCropModal
  imageUrl={cropImage}
  onCropComplete={handleCropComplete}
  onClose={() => setCropImage(null)}
  onSkipCrop={handleSkipCrop}
  isUploading={isUploading}
/>
```

**Step 2: Update ImageCropModal to accept `isUploading` prop**

In `ImageCropModal.tsx`, add `isUploading?: boolean` to the props interface and disable the "Apply Crop" button when uploading:

```tsx
// Props interface:
isUploading?: boolean;

// Apply button:
<button
  onClick={handleApply}
  disabled={!completedCrop || isUploading}
  className="..."
>
  {isUploading ? 'Uploading...' : 'Apply Crop'}
</button>
```

**Step 3: Verify manually**

Run both servers:
```bash
cd back && npm run start:dev   # Terminal 1
cd web && npm run dev           # Terminal 2
```

1. Open a course in the editor
2. Click on an image block → "Change image"
3. Select a placeholder → crop → Apply
4. Check that the image URL in the component data is now `/api/v1/uploads/images/{uuid}.jpg` instead of `data:image/jpeg;base64,...`
5. Verify the image renders correctly

**Step 4: Commit**

```bash
git add web/app/project/[courseKey]/_components/ImagePickerModal.tsx web/app/project/[courseKey]/_components/ImageCropModal.tsx
git commit -m "feat: upload cropped images to server instead of storing base64"
```

---

### Task 9: Final verification

**Step 1: Run backend tests**

Run: `cd back && npm test`
Expected: All tests pass.

**Step 2: Run frontend build**

Run: `cd web && npm run build`
Expected: Compiles without errors.

**Step 3: End-to-end manual test**

1. Login to the editor
2. Edit a course, click an image block
3. Paste an external URL → skip crop → should save external URL as-is
4. Select a placeholder → crop it → should upload to server, save `/api/v1/uploads/images/{uuid}.jpg`
5. Verify the uploaded file exists in `back/uploads/images/`
6. Verify the image renders in the editor and preview

**Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "feat: image storage abstraction complete"
```
