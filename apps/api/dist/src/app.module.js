"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("@nestjs/bullmq");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const health_module_1 = require("./health/health.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const queue_module_1 = require("./queue/queue.module");
const course_module_1 = require("./course/course.module");
const conversation_module_1 = require("./conversation/conversation.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const notification_module_1 = require("./notification/notification.module");
const organization_module_1 = require("./organization/organization.module");
const lms_module_1 = require("./lms/lms.module");
const badge_module_1 = require("./badge/badge.module");
const learning_plan_module_1 = require("./learning-plan/learning-plan.module");
const group_module_1 = require("./group/group.module");
const analytics_module_1 = require("./analytics/analytics.module");
const email_module_1 = require("./email/email.module");
const storage_module_1 = require("./storage/storage.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    connection: {
                        host: configService.get('REDIS_HOST', 'localhost'),
                        port: configService.get('REDIS_PORT', 6379),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            queue_module_1.QueueModule,
            course_module_1.CourseModule,
            conversation_module_1.ConversationModule,
            portfolio_module_1.PortfolioModule,
            notification_module_1.NotificationModule,
            organization_module_1.OrganizationModule,
            lms_module_1.LmsModule,
            badge_module_1.BadgeModule,
            learning_plan_module_1.LearningPlanModule,
            group_module_1.GroupModule,
            analytics_module_1.AnalyticsModule,
            email_module_1.EmailModule,
            storage_module_1.StorageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map