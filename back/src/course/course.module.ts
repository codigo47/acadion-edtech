import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSSEService } from './course-sse.service';
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
  providers: [CourseService, CourseSSEService, CourseOrchestratorProcessor],
  exports: [CourseService, CourseSSEService],
})
export class CourseModule {}
