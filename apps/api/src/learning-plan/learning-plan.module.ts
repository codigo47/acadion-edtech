import { Module } from '@nestjs/common';
import { LearningPlanService } from './learning-plan.service';
import { LearningPlanController } from './learning-plan.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [LearningPlanController],
  providers: [LearningPlanService],
  exports: [LearningPlanService],
})
export class LearningPlanModule {}
