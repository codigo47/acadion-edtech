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
exports.SubmitPostAssessmentDto = exports.SubmitPreAssessmentDto = exports.AdminEnrollDto = exports.SubmitKnowledgeCheckDto = exports.CompleteCourseDto = exports.UpdateProgressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateProgressDto {
    unitCode;
    timeSpentSeconds;
    completed;
    focusLossCount;
}
exports.UpdateProgressDto = UpdateProgressDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "unitCode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProgressDto.prototype, "timeSpentSeconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProgressDto.prototype, "completed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProgressDto.prototype, "focusLossCount", void 0);
class CompleteCourseDto {
    passed;
    score;
}
exports.CompleteCourseDto = CompleteCourseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompleteCourseDto.prototype, "passed", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CompleteCourseDto.prototype, "score", void 0);
class SubmitKnowledgeCheckDto {
    unitCode;
    questionIndex;
    answer;
    isCorrect;
}
exports.SubmitKnowledgeCheckDto = SubmitKnowledgeCheckDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitKnowledgeCheckDto.prototype, "unitCode", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SubmitKnowledgeCheckDto.prototype, "questionIndex", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmitKnowledgeCheckDto.prototype, "isCorrect", void 0);
class AdminEnrollDto {
    userId;
}
exports.AdminEnrollDto = AdminEnrollDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminEnrollDto.prototype, "userId", void 0);
class ConfidenceAnswerDto {
    unitCode;
    confidenceScore;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfidenceAnswerDto.prototype, "unitCode", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], ConfidenceAnswerDto.prototype, "confidenceScore", void 0);
class SubmitPreAssessmentDto {
    enrollmentId;
    answers;
}
exports.SubmitPreAssessmentDto = SubmitPreAssessmentDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SubmitPreAssessmentDto.prototype, "enrollmentId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ConfidenceAnswerDto),
    __metadata("design:type", Array)
], SubmitPreAssessmentDto.prototype, "answers", void 0);
class SubmitPostAssessmentDto {
    enrollmentId;
    answers;
}
exports.SubmitPostAssessmentDto = SubmitPostAssessmentDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SubmitPostAssessmentDto.prototype, "enrollmentId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ConfidenceAnswerDto),
    __metadata("design:type", Array)
], SubmitPostAssessmentDto.prototype, "answers", void 0);
//# sourceMappingURL=lms.dto.js.map