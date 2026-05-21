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
exports.UpdatePortfolioCoursesDto = exports.UpdatePortfolioDto = exports.PortfolioMediaItemDto = exports.SocialCustomLinkDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const VALID_THEMES = [
    'corporate_professional',
    'minimal_tech',
    'creative_modern',
    'elegant_dark',
    'vibrant_startup',
    'natural_organic',
    'casual_creative',
    'sophisticated_premium',
    'futuristic_ai',
    'editorial_blue_white',
];
class SocialCustomLinkDto {
    label;
    url;
}
exports.SocialCustomLinkDto = SocialCustomLinkDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialCustomLinkDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialCustomLinkDto.prototype, "url", void 0);
class PortfolioMediaItemDto {
    url;
    description;
}
exports.PortfolioMediaItemDto = PortfolioMediaItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PortfolioMediaItemDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PortfolioMediaItemDto.prototype, "description", void 0);
class UpdatePortfolioDto {
    title;
    tagline;
    bio;
    portraitImage;
    coverImage;
    email;
    phone;
    theme;
    skills;
    languages;
    socialLinkedin;
    socialTwitter;
    socialInstagram;
    socialCustom;
    images;
    videos;
    isPublic;
}
exports.UpdatePortfolioDto = UpdatePortfolioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "tagline", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "portraitImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "coverImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsIn)(VALID_THEMES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "theme", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePortfolioDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePortfolioDto.prototype, "languages", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "socialLinkedin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "socialTwitter", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePortfolioDto.prototype, "socialInstagram", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SocialCustomLinkDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePortfolioDto.prototype, "socialCustom", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PortfolioMediaItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePortfolioDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PortfolioMediaItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePortfolioDto.prototype, "videos", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePortfolioDto.prototype, "isPublic", void 0);
class UpdatePortfolioCoursesDto {
    courseIds;
}
exports.UpdatePortfolioCoursesDto = UpdatePortfolioCoursesDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], UpdatePortfolioCoursesDto.prototype, "courseIds", void 0);
//# sourceMappingURL=update-portfolio.dto.js.map