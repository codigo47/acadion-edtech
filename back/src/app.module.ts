import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QueueModule } from './queue/queue.module';
import { CourseModule } from './course/course.module';
import { ConversationModule } from './conversation/conversation.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { NotificationModule } from './notification/notification.module';
import { OrganizationModule } from './organization/organization.module';
import { LmsModule } from './lms/lms.module';
import { BadgeModule } from './badge/badge.module';
import { LearningPlanModule } from './learning-plan/learning-plan.module';
import { GroupModule } from './group/group.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    QueueModule,
    CourseModule,
    ConversationModule,
    PortfolioModule,
    NotificationModule,
    OrganizationModule,
    LmsModule,
    BadgeModule,
    LearningPlanModule,
    GroupModule,
    AnalyticsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
