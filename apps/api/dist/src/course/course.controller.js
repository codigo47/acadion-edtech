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
var CourseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const rxjs_1 = require("rxjs");
const course_service_1 = require("./course.service");
const course_sse_service_1 = require("./course-sse.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const task_dto_1 = require("./dto/task.dto");
const course_component_dto_1 = require("./dto/course-component.dto");
const task_name_enum_1 = require("./enums/task-name.enum");
let CourseController = CourseController_1 = class CourseController {
    courseService;
    sseService;
    logger = new common_1.Logger(CourseController_1.name);
    constructor(courseService, sseService) {
        this.courseService = courseService;
        this.sseService = sseService;
    }
    async executeTask(taskDto) {
        this.logger.log(`Executing task: ${taskDto.taskName}`);
        switch (taskDto.taskName) {
            case task_name_enum_1.TaskName.CREATE_COURSE:
                this.logger.log(`Creating course for user: ${taskDto.userId}`);
                return this.courseService.create(taskDto);
            case task_name_enum_1.TaskName.GENERATE_TITLE:
                this.logger.log(`Generating title for course: ${taskDto.courseKey}, topic: ${taskDto.topic}`);
                return this.courseService.generateTitle(taskDto);
            case task_name_enum_1.TaskName.SET_AUDIENCE:
                this.logger.log(`Setting audience for course: ${taskDto.courseKey}, audience: ${taskDto.audience}`);
                return this.courseService.setAudience(taskDto);
            case task_name_enum_1.TaskName.SET_OBJECTIVE:
                this.logger.log(`Setting objective for course: ${taskDto.courseKey}, objective: ${taskDto.objective}`);
                return this.courseService.setObjective(taskDto);
            case task_name_enum_1.TaskName.SET_BUILDING_METHOD:
                this.logger.log(`Setting building method for course: ${taskDto.courseKey}, method: ${taskDto.buildingMethod}`);
                return this.courseService.setBuildingMethod(taskDto.courseKey, taskDto);
            case task_name_enum_1.TaskName.SET_MODULES:
                this.logger.log(`Setting modules for course: ${taskDto.courseKey}, count: ${taskDto.modulesCount}`);
                return this.courseService.setModules(taskDto.courseKey, taskDto);
            case task_name_enum_1.TaskName.SET_UNITS:
                this.logger.log(`Setting units for course: ${taskDto.courseKey}, modules: ${JSON.stringify(taskDto.modules)}`);
                return this.courseService.setUnits(taskDto.courseKey, taskDto);
            case task_name_enum_1.TaskName.GET_EXERCISE_TYPES:
                this.logger.log(`Getting exercise types for course: ${taskDto.courseKey}`);
                return this.courseService.getExerciseTypes(taskDto.courseKey, taskDto.conversationKey);
            case task_name_enum_1.TaskName.SET_EVALUATION:
                this.logger.log(`Setting evaluation for course: ${taskDto.courseKey}, components: ${JSON.stringify(taskDto.selectedComponents)}`);
                return this.courseService.setEvaluation(taskDto.courseKey, taskDto.conversationKey, taskDto.selectedComponents);
            case task_name_enum_1.TaskName.SET_EVALUATION_DETAILS:
                this.logger.log(`Setting evaluation details for course: ${taskDto.courseKey}`);
                return this.courseService.setEvaluationDetails(taskDto.courseKey, taskDto);
            case task_name_enum_1.TaskName.SET_BRANDING:
                this.logger.log(`Setting branding for course: ${taskDto.courseKey}`);
                return this.courseService.setBranding(taskDto.courseKey, taskDto);
            case task_name_enum_1.TaskName.GENERATE_COURSE:
                this.logger.log(`Generating course: ${taskDto.courseKey}`);
                return this.courseService.generateCourse(taskDto.courseKey);
            default: {
                const unknownTask = taskDto.taskName;
                this.logger.error(`Unknown task: ${unknownTask}`);
                throw new Error(`Unknown task: ${unknownTask}`);
            }
        }
    }
    async findAll(req, pagination) {
        return this.courseService.findAllByUserId(req.user.id, pagination);
    }
    async findOne(key) {
        return this.courseService.findByKey(key);
    }
    async getCourseComponents(key) {
        return this.courseService.getCourseComponents(key);
    }
    async createComponent(key, dto, req) {
        return this.courseService.createComponent(key, dto, req.user.id);
    }
    async updateComponentData(id, dto) {
        return this.courseService.updateComponentData(+id, dto.data);
    }
    async deleteComponent(id) {
        return this.courseService.deleteComponent(+id);
    }
    async duplicateComponent(id) {
        return this.courseService.duplicateComponent(+id);
    }
    async reorderComponents(key, dto) {
        return this.courseService.reorderComponents(key, dto.components);
    }
    async switchComponentStyle(id, dto) {
        return this.courseService.switchComponentStyle(+id, dto.newComponentId);
    }
    events(key) {
        this.logger.log(`SSE connection opened for course: ${key}`);
        return this.sseService.getEventStream(key).pipe((0, rxjs_1.map)((event) => {
            return {
                data: event,
                type: event.type,
            };
        }));
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)('tasks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "executeTask", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':key/components'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseComponents", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':key/components'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_component_dto_1.CreateComponentDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createComponent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('components/:id/data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_component_dto_1.UpdateComponentDataDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateComponentData", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('components/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteComponent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('components/:id/duplicate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "duplicateComponent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':key/components/reorder'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_component_dto_1.ReorderComponentsDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "reorderComponents", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('components/:id/switch-style'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_component_dto_1.SwitchStyleDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "switchComponentStyle", null);
__decorate([
    (0, common_1.Sse)(':key/events'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "events", null);
exports.CourseController = CourseController = CourseController_1 = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        course_sse_service_1.CourseSSEService])
], CourseController);
//# sourceMappingURL=course.controller.js.map