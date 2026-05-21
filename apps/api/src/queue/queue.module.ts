import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { TestingProcessor } from './testing.processor';
import { TESTING_QUEUE } from './constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: TESTING_QUEUE,
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, TestingProcessor],
  exports: [QueueService],
})
export class QueueModule {}
