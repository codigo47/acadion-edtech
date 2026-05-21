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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const local_storage_provider_1 = require("./providers/local-storage.provider");
let StorageService = class StorageService {
    configService;
    localProvider;
    provider;
    constructor(configService, localProvider) {
        this.configService = configService;
        this.localProvider = localProvider;
        const providerName = this.configService.get('STORAGE_PROVIDER', 'local');
        switch (providerName) {
            case 'local':
            default:
                this.provider = this.localProvider;
        }
    }
    async upload(file, filename, mimetype) {
        return this.provider.upload(file, filename, mimetype);
    }
    async delete(fileUrl) {
        return this.provider.delete(fileUrl);
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        local_storage_provider_1.LocalStorageProvider])
], StorageService);
//# sourceMappingURL=storage.service.js.map