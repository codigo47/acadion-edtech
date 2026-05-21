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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("bullmq");
const health_service_1 = require("./health.service");
const queue_service_1 = require("../queue/queue.service");
let HealthController = class HealthController {
    healthService;
    queueService;
    configService;
    constructor(healthService, queueService, configService) {
        this.healthService = healthService;
        this.queueService = queueService;
        this.configService = configService;
    }
    async check() {
        return this.healthService.check();
    }
    async createJob() {
        const job = await this.queueService.addTestingJob({
            message: 'Health check test job',
            timestamp: Date.now(),
            data: {
                source: 'health-endpoint',
                environment: process.env.NODE_ENV || 'development',
                randomId: Math.random().toString(36).substring(7),
                testArray: [1, 2, 3, 4, 5],
                nested: {
                    foo: 'bar',
                    count: 42,
                },
            },
        });
        return {
            success: true,
            message: 'Job created successfully',
            job,
        };
    }
    async readJob(jobId) {
        if (!jobId) {
            throw new common_1.NotFoundException('jobId query parameter is required');
        }
        const job = await this.queueService.getJob(jobId);
        if (!job) {
            throw new common_1.NotFoundException(`Job with id ${jobId} not found`);
        }
        return {
            success: true,
            job,
        };
    }
    async deleteJob(jobId) {
        if (!jobId) {
            throw new common_1.NotFoundException('jobId query parameter is required');
        }
        const result = await this.queueService.deleteJob(jobId);
        if (!result) {
            throw new common_1.NotFoundException(`Job with id ${jobId} not found`);
        }
        return {
            success: true,
            message: 'Job deleted successfully',
            ...result,
        };
    }
    async getActiveJobs(queueName) {
        const queue = new bullmq_1.Queue(queueName, {
            connection: {
                host: this.configService.get('REDIS_HOST', 'localhost'),
                port: this.configService.get('REDIS_PORT', 6379),
            },
        });
        try {
            const activeJobs = await queue.getActive();
            const jobs = activeJobs.map((job) => ({
                jobId: job.id,
                name: job.name,
                data: job.data,
                progress: job.progress,
                timestamp: job.timestamp,
                processedOn: job.processedOn,
            }));
            return {
                queue: queueName,
                count: jobs.length,
                jobs,
            };
        }
        finally {
            await queue.close();
        }
    }
    async emptyQueue(queueName) {
        const queue = new bullmq_1.Queue(queueName, {
            connection: {
                host: this.configService.get('REDIS_HOST', 'localhost'),
                port: this.configService.get('REDIS_PORT', 6379),
            },
        });
        try {
            await queue.obliterate({ force: true });
            return {
                success: true,
                queue: queueName,
                message: 'Queue emptied successfully',
            };
        }
        finally {
            await queue.close();
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('create-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)('read-job'),
    __param(0, (0, common_1.Query)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readJob", null);
__decorate([
    (0, common_1.Get)('delete-job'),
    __param(0, (0, common_1.Query)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Get)('queue/:queueName'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getActiveJobs", null);
__decorate([
    (0, common_1.Get)('queue/:queueName/empty'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "emptyQueue", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [health_service_1.HealthService,
        queue_service_1.QueueService,
        config_1.ConfigService])
], HealthController);
//# sourceMappingURL=health.controller.js.map