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
exports.BulkAssignPlanDto = exports.AssignPlanToGroupDto = exports.AssignPlanDto = exports.ReorderPlanCoursesDto = exports.AddPlanCourseDto = exports.UpdateLearningPlanDto = exports.CreateLearningPlanDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateLearningPlanDto {
    name;
    description;
    image;
    badgeImage;
    badgeName;
    estimatedDays;
    isCorrelative;
    isOptional;
    parentId;
}
exports.CreateLearningPlanDto = CreateLearningPlanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLearningPlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLearningPlanDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLearningPlanDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLearningPlanDto.prototype, "badgeImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLearningPlanDto.prototype, "badgeName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLearningPlanDto.prototype, "estimatedDays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLearningPlanDto.prototype, "isCorrelative", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLearningPlanDto.prototype, "isOptional", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLearningPlanDto.prototype, "parentId", void 0);
class UpdateLearningPlanDto {
    name;
    description;
    image;
    badgeImage;
    badgeName;
    estimatedDays;
    isCorrelative;
    isOptional;
    parentId;
}
exports.UpdateLearningPlanDto = UpdateLearningPlanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLearningPlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLearningPlanDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLearningPlanDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLearningPlanDto.prototype, "badgeImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLearningPlanDto.prototype, "badgeName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLearningPlanDto.prototype, "estimatedDays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLearningPlanDto.prototype, "isCorrelative", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLearningPlanDto.prototype, "isOptional", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLearningPlanDto.prototype, "parentId", void 0);
class AddPlanCourseDto {
    courseId;
    order;
    required;
}
exports.AddPlanCourseDto = AddPlanCourseDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AddPlanCourseDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AddPlanCourseDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AddPlanCourseDto.prototype, "required", void 0);
class CourseOrderItem {
    courseId;
    order;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CourseOrderItem.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CourseOrderItem.prototype, "order", void 0);
class ReorderPlanCoursesDto {
    courses;
}
exports.ReorderPlanCoursesDto = ReorderPlanCoursesDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CourseOrderItem),
    __metadata("design:type", Array)
], ReorderPlanCoursesDto.prototype, "courses", void 0);
class AssignPlanDto {
    userId;
    deadline;
}
exports.AssignPlanDto = AssignPlanDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignPlanDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignPlanDto.prototype, "deadline", void 0);
class AssignPlanToGroupDto {
    groupId;
    deadline;
}
exports.AssignPlanToGroupDto = AssignPlanToGroupDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AssignPlanToGroupDto.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignPlanToGroupDto.prototype, "deadline", void 0);
class BulkAssignUserDto {
    email;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], BulkAssignUserDto.prototype, "email", void 0);
class BulkAssignPlanDto {
    users;
    deadline;
}
exports.BulkAssignPlanDto = BulkAssignPlanDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkAssignUserDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BulkAssignPlanDto.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkAssignPlanDto.prototype, "deadline", void 0);
//# sourceMappingURL=learning-plan.dto.js.map