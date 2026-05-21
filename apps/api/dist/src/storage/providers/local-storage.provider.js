"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocalStorageProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const promises_1 = require("fs/promises");
let LocalStorageProvider = LocalStorageProvider_1 = class LocalStorageProvider {
    configService;
    logger = new common_1.Logger(LocalStorageProvider_1.name);
    uploadDir = (0, path_1.join)(process.cwd(), 'uploads', 'images');
    baseUrl;
    constructor(configService) {
        this.configService = configService;
        const port = this.configService.get('PORT', 8001);
        const backendUrl = this.configService.get('BACKEND_URL', `http://localhost:${port}`);
        this.baseUrl = `${backendUrl}/api/v1/uploads/images`;
    }
    async upload(file, filename) {
        await (0, promises_1.mkdir)(this.uploadDir, { recursive: true });
        const filePath = (0, path_1.join)(this.uploadDir, filename);
        await (0, promises_1.writeFile)(filePath, file);
        this.logger.log(`Saved image: ${filename}`);
        return `${this.baseUrl}/${filename}`;
    }
    async delete(fileUrl) {
        const filename = fileUrl.split('/').pop();
        if (!filename)
            return;
        const filePath = (0, path_1.join)(this.uploadDir, filename);
        try {
            await (0, promises_1.unlink)(filePath);
            this.logger.log(`Deleted image: ${filename}`);
        }
        catch {
            this.logger.warn(`File not found for deletion: ${filename}`);
        }
    }
};
exports.LocalStorageProvider = LocalStorageProvider;
exports.LocalStorageProvider = LocalStorageProvider = LocalStorageProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LocalStorageProvider);
//# sourceMappingURL=local-storage.provider.js.map