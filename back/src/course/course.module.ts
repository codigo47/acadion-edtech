import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseOrchestratorProcessor } from './course-orchestrator.processor';
import { PrismaModule } from '../prisma/prisma.module';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: COURSE_ORCHESTRATION_QUEUE,
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseOrchestratorProcessor],
  exports: [CourseService],
})
export class CourseModule {}
