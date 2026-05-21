export interface StorageProvider {
  upload(file: Buffer, filename: string, mimetype: string): Promise<string>;
  delete(fileUrl: string): Promise<void>;
}
