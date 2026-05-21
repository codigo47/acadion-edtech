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
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const constants_1 = require("./constants");
let QueueService = class QueueService {
    testingQueue;
    constructor(testingQueue) {
        this.testingQueue = testingQueue;
    }
    async addTestingJob(data) {
        const job = await this.testingQueue.add('test-job', data, {
            removeOnComplete: false,
            removeOnFail: false,
        });
        return {
            jobId: job.id,
            name: job.name,
            data: job.data,
            timestamp: job.timestamp,
        };
    }
    async getJob(jobId) {
        const job = await this.testingQueue.getJob(jobId);
        if (!job) {
            return null;
        }
        const state = await job.getState();
        return {
            jobId: job.id,
            name: job.name,
            data: job.data,
            state,
            progress: job.progress,
            returnvalue: job.returnvalue,
            failedReason: job.failedReason,
            timestamp: job.timestamp,
            finishedOn: job.finishedOn,
            processedOn: job.processedOn,
        };
    }
    async deleteJob(jobId) {
        const job = await this.testingQueue.getJob(jobId);
        if (!job) {
            return null;
        }
        await job.remove();
        return {
            jobId: job.id,
            deleted: true,
        };
    }
    async getQueueStats() {
        const [waiting, active, completed, failed, delayed] = await Promise.all([
            this.testingQueue.getWaitingCount(),
            this.testingQueue.getActiveCount(),
            this.testingQueue.getCompletedCount(),
            this.testingQueue.getFailedCount(),
            this.testingQueue.getDelayedCount(),
        ]);
        return {
            queue: constants_1.TESTING_QUEUE,
            waiting,
            active,
            completed,
            failed,
            delayed,
        };
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(constants_1.TESTING_QUEUE)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], QueueService);
//# sourceMappingURL=queue.service.js.map