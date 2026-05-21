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
var CourseOrchestratorProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOrchestratorProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const course_sse_service_1 = require("../course-sse.service");
const constants_1 = require("../constants");
const handlers_1 = require("./handlers");
let CourseOrchestratorProcessor = CourseOrchestratorProcessor_1 = class CourseOrchestratorProcessor extends bullmq_1.WorkerHost {
    prisma;
    sseService;
    logger = new common_1.Logger(CourseOrchestratorProcessor_1.name);
    objectivesHandler;
    indexHandler;
    introUnitHandler;
    contentUnitHandler;
    moduleEvaluationHandler;
    courseEvaluationHandler;
    constructor(prisma, sseService) {
        super();
        this.prisma = prisma;
        this.sseService = sseService;
        this.objectivesHandler = new handlers_1.ObjectivesHandler(prisma, sseService);
        this.indexHandler = new handlers_1.IndexHandler(prisma, sseService);
        this.introUnitHandler = new handlers_1.IntroUnitHandler(prisma, sseService);
        this.contentUnitHandler = new handlers_1.ContentUnitHandler(prisma, sseService);
        this.moduleEvaluationHandler = new handlers_1.ModuleEvaluationHandler(prisma, sseService);
        this.courseEvaluationHandler = new handlers_1.CourseEvaluationHandler(prisma, sseService);
    }
    async process(job) {
        this.logger.log(`Processing job ${job.id} - ${job.name}`);
        switch (job.name) {
            case 'generate_objectives':
                return this.objectivesHandler.generate(job);
            case 'generate_index':
                return this.indexHandler.generate(job);
            case 'generate_intro_unit':
                return this.introUnitHandler.generate(job);
            case 'generate_content_unit':
                return this.contentUnitHandler.generate(job);
            case 'generate_module_evaluation':
                return this.moduleEvaluationHandler.generate(job);
            case 'generate_course_evaluation':
                return this.courseEvaluationHandler.generate(job);
            default:
                this.logger.warn(`Unknown job name: ${job.name}`);
                return null;
        }
    }
};
exports.CourseOrchestratorProcessor = CourseOrchestratorProcessor;
exports.CourseOrchestratorProcessor = CourseOrchestratorProcessor = CourseOrchestratorProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(constants_1.COURSE_ORCHESTRATION_QUEUE),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        course_sse_service_1.CourseSSEService])
], CourseOrchestratorProcessor);
//# sourceMappingURL=course-orchestrator.processor.js.map