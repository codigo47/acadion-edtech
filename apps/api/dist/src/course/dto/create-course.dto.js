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
exports.SetBrandingDto = exports.SetEvaluationDetailsDto = exports.SetUnitsDto = exports.SetModulesDto = exports.SetBuildingMethodDto = exports.SetObjectiveDto = exports.SetAudienceDto = exports.GenerateTitleDto = exports.CreateCourseDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCourseDto {
    userId;
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "userId", void 0);
class GenerateTitleDto {
    courseKey;
    conversationKey;
    topic;
}
exports.GenerateTitleDto = GenerateTitleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateTitleDto.prototype, "courseKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateTitleDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateTitleDto.prototype, "topic", void 0);
class SetAudienceDto {
    courseKey;
    conversationKey;
    audience;
}
exports.SetAudienceDto = SetAudienceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetAudienceDto.prototype, "courseKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetAudienceDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetAudienceDto.prototype, "audience", void 0);
class SetObjectiveDto {
    courseKey;
    conversationKey;
    objective;
}
exports.SetObjectiveDto = SetObjectiveDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetObjectiveDto.prototype, "courseKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetObjectiveDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetObjectiveDto.prototype, "objective", void 0);
class SetBuildingMethodDto {
    conversationKey;
    buildingMethod;
}
exports.SetBuildingMethodDto = SetBuildingMethodDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBuildingMethodDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBuildingMethodDto.prototype, "buildingMethod", void 0);
class SetModulesDto {
    conversationKey;
    modulesCount;
}
exports.SetModulesDto = SetModulesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetModulesDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SetModulesDto.prototype, "modulesCount", void 0);
class SetUnitsDto {
    conversationKey;
    modules;
}
exports.SetUnitsDto = SetUnitsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetUnitsDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SetUnitsDto.prototype, "modules", void 0);
class SetEvaluationDetailsDto {
    conversationKey;
    knowledgeCheckEndUnit;
    knowledgeCheckEndModule;
    finalExercise;
    restrictions;
}
exports.SetEvaluationDetailsDto = SetEvaluationDetailsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetEvaluationDetailsDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetEvaluationDetailsDto.prototype, "restrictions", void 0);
class SetBrandingDto {
    conversationKey;
    primaryColor;
    secondaryColor;
    typo1;
    typo2;
    logo;
    guidelines;
}
exports.SetBrandingDto = SetBrandingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "conversationKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "primaryColor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "typo1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "typo2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "logo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetBrandingDto.prototype, "guidelines", void 0);
//# sourceMappingURL=create-course.dto.js.map