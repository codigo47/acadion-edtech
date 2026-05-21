"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const course_controller_1 = require("./course.controller");
const course_service_1 = require("./course.service");
const course_sse_service_1 = require("./course-sse.service");
const orchestrator_1 = require("./orchestrator");
const prisma_module_1 = require("../prisma/prisma.module");
const constants_1 = require("./constants");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            bullmq_1.BullModule.registerQueue({
                name: constants_1.COURSE_ORCHESTRATION_QUEUE,
            }),
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService, course_sse_service_1.CourseSSEService, orchestrator_1.CourseOrchestratorProcessor],
        exports: [course_service_1.CourseService, course_sse_service_1.CourseSSEService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map