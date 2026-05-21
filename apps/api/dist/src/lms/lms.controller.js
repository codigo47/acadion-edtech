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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const lms_service_1 = require("./lms.service");
const adaptive_service_1 = require("./adaptive.service");
const lms_dto_1 = require("./dto/lms.dto");
let LmsController = class LmsController {
    lmsService;
    adaptiveService;
    constructor(lmsService, adaptiveService) {
        this.lmsService = lmsService;
        this.adaptiveService = adaptiveService;
    }
    getStudentDashboard(req) {
        return this.lmsService.getStudentDashboard(req.user.id);
    }
    getCourseContent(key, req) {
        return this.lmsService.getCourseContent(key, req.user.id);
    }
    selfEnroll(key, req) {
        return this.lmsService.selfEnroll(key, req.user.id);
    }
    updateProgress(key, req, dto) {
        return this.lmsService.updateProgress(key, req.user.id, dto);
    }
    completeCourse(key, req, dto) {
        return this.lmsService.completeCourse(key, req.user.id, dto);
    }
    submitKnowledgeCheck(key, req, dto) {
        return this.lmsService.submitKnowledgeCheck(key, req.user.id, dto);
    }
    adminEnroll(key, dto) {
        return this.lmsService.adminEnroll(key, dto);
    }
    adminReEnroll(key, userId) {
        return this.lmsService.adminReEnroll(key, userId);
    }
    getPreAssessment(key, req) {
        return this.adaptiveService.getPreAssessment(key, req.user.id);
    }
    submitPreAssessment(key, req, dto) {
        return this.adaptiveService.submitPreAssessment(dto.enrollmentId, req.user.id, dto.answers);
    }
    getPostAssessment(key, req) {
        return this.adaptiveService.getPostAssessment(key, req.user.id);
    }
    submitPostAssessment(key, req, dto) {
        return this.adaptiveService.submitPostAssessment(dto.enrollmentId, req.user.id, dto.answers);
    }
};
exports.LmsController = LmsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getStudentDashboard", null);
__decorate([
    (0, common_1.Get)('courses/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getCourseContent", null);
__decorate([
    (0, common_1.Post)('courses/:key/enroll'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "selfEnroll", null);
__decorate([
    (0, common_1.Patch)('courses/:key/progress'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lms_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Post)('courses/:key/complete'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lms_dto_1.CompleteCourseDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "completeCourse", null);
__decorate([
    (0, common_1.Post)('courses/:key/knowledge-check'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lms_dto_1.SubmitKnowledgeCheckDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "submitKnowledgeCheck", null);
__decorate([
    (0, common_1.Post)('courses/:key/admin-enroll'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lms_dto_1.AdminEnrollDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "adminEnroll", null);
__decorate([
    (0, common_1.Post)('courses/:key/re-enroll/:userId'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "adminReEnroll", null);
__decorate([
    (0, common_1.Get)('courses/:key/pre-assessment'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getPreAssessment", null);
__decorate([
    (0, common_1.Post)('courses/:key/pre-assessment'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lms_dto_1.SubmitPreAssessmentDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "submitPreAssessment", null);
__decorate([
    (0, common_1.Get)('courses/:key/post-assessment'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getPostAssessment", null);
__decorate([
    (0, common_1.Post)('courses/:key/post-assessment'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lms_dto_1.SubmitPostAssessmentDto]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "submitPostAssessment", null);
exports.LmsController = LmsController = __decorate([
    (0, common_1.Controller)('lms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [lms_service_1.LmsService,
        adaptive_service_1.AdaptiveService])
], LmsController);
//# sourceMappingURL=lms.controller.js.map