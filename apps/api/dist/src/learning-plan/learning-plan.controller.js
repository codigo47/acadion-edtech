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
exports.LearningPlanController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const learning_plan_service_1 = require("./learning-plan.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const learning_plan_dto_1 = require("./dto/learning-plan.dto");
let LearningPlanController = class LearningPlanController {
    learningPlanService;
    constructor(learningPlanService) {
        this.learningPlanService = learningPlanService;
    }
    getMyPlans(req, pagination) {
        return this.learningPlanService.getMyPlans(req.user.id, pagination);
    }
    getOrgPlans(orgKey) {
        return this.learningPlanService.getOrgPlans(orgKey);
    }
    getPlanDetail(id) {
        return this.learningPlanService.getPlanDetail(id);
    }
    createPlan(orgKey, dto) {
        return this.learningPlanService.createPlan(orgKey, dto);
    }
    updatePlan(id, dto) {
        return this.learningPlanService.updatePlan(id, dto);
    }
    deletePlan(id) {
        return this.learningPlanService.deletePlan(id);
    }
    addCourse(id, dto) {
        return this.learningPlanService.addCourse(id, dto);
    }
    removeCourse(id, courseId) {
        return this.learningPlanService.removeCourse(id, courseId);
    }
    reorderCourses(id, dto) {
        return this.learningPlanService.reorderCourses(id, dto);
    }
    assignToUser(id, dto) {
        return this.learningPlanService.assignToUser(id, dto);
    }
    assignToGroup(id, dto) {
        return this.learningPlanService.assignToGroup(id, dto);
    }
    bulkAssignPlan(id, dto, req) {
        return this.learningPlanService.bulkAssignPlan(id, dto.users, dto.deadline, req.user.id);
    }
    getStudentPlanDetail(id, req) {
        return this.learningPlanService.getStudentPlanDetail(id, req.user.id);
    }
};
exports.LearningPlanController = LearningPlanController;
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "getMyPlans", null);
__decorate([
    (0, common_1.Get)('org/:orgKey'),
    __param(0, (0, common_1.Param)('orgKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "getOrgPlans", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "getPlanDetail", null);
__decorate([
    (0, common_1.Post)('org/:orgKey'),
    __param(0, (0, common_1.Param)('orgKey')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, learning_plan_dto_1.CreateLearningPlanDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.UpdateLearningPlanDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "updatePlan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "deletePlan", null);
__decorate([
    (0, common_1.Post)(':id/courses'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.AddPlanCourseDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Delete)(':id/courses/:courseId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "removeCourse", null);
__decorate([
    (0, common_1.Patch)(':id/courses/reorder'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.ReorderPlanCoursesDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "reorderCourses", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.AssignPlanDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "assignToUser", null);
__decorate([
    (0, common_1.Post)(':id/assign-group'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.AssignPlanToGroupDto]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "assignToGroup", null);
__decorate([
    (0, common_1.Post)(':id/assign-bulk'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, learning_plan_dto_1.BulkAssignPlanDto, Object]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "bulkAssignPlan", null);
__decorate([
    (0, common_1.Get)(':id/student'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "getStudentPlanDetail", null);
exports.LearningPlanController = LearningPlanController = __decorate([
    (0, common_1.Controller)('learning-plans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [learning_plan_service_1.LearningPlanService])
], LearningPlanController);
//# sourceMappingURL=learning-plan.controller.js.map