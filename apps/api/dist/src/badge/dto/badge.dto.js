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
exports.AwardBadgeDto = exports.UpdateBadgeDto = exports.CreateBadgeDto = exports.BadgeTypeEnum = void 0;
const class_validator_1 = require("class-validator");
var BadgeTypeEnum;
(function (BadgeTypeEnum) {
    BadgeTypeEnum["progress"] = "progress";
    BadgeTypeEnum["level"] = "level";
    BadgeTypeEnum["excellence"] = "excellence";
    BadgeTypeEnum["role"] = "role";
})(BadgeTypeEnum || (exports.BadgeTypeEnum = BadgeTypeEnum = {}));
class CreateBadgeDto {
    name;
    description;
    image;
    type;
    conditionType;
    conditionValue;
    targetId;
    isPublic;
    orgId;
}
exports.CreateBadgeDto = CreateBadgeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBadgeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBadgeDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBadgeDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(BadgeTypeEnum),
    __metadata("design:type", String)
], CreateBadgeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBadgeDto.prototype, "conditionType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateBadgeDto.prototype, "conditionValue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateBadgeDto.prototype, "targetId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBadgeDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateBadgeDto.prototype, "orgId", void 0);
class UpdateBadgeDto {
    name;
    description;
    image;
    type;
    conditionType;
    conditionValue;
    targetId;
    isPublic;
    isActive;
}
exports.UpdateBadgeDto = UpdateBadgeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBadgeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBadgeDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBadgeDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BadgeTypeEnum),
    __metadata("design:type", String)
], UpdateBadgeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBadgeDto.prototype, "conditionType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateBadgeDto.prototype, "conditionValue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateBadgeDto.prototype, "targetId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateBadgeDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateBadgeDto.prototype, "isActive", void 0);
class AwardBadgeDto {
    userId;
}
exports.AwardBadgeDto = AwardBadgeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AwardBadgeDto.prototype, "userId", void 0);
//# sourceMappingURL=badge.dto.js.map