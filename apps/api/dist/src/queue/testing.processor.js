"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TestingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let TestingProcessor = TestingProcessor_1 = class TestingProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(TestingProcessor_1.name);
    async process(job) {
        this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
        await this.delay(1000);
        const result = {
            processed: true,
            jobId: job.id,
            originalData: job.data,
            processedAt: new Date().toISOString(),
            result: `Processed message: "${job.data.message}"`,
        };
        this.logger.log(`Job ${job.id} completed with result: ${JSON.stringify(result)}`);
        return result;
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.TestingProcessor = TestingProcessor;
exports.TestingProcessor = TestingProcessor = TestingProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(constants_1.TESTING_QUEUE)
], TestingProcessor);
//# sourceMappingURL=testing.processor.js.map