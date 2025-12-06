import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { TestingProcessor } from './testing.processor';
import { TESTING_QUEUE } from './constants';

@Module({
  imports: [
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
    BullModule.registerQueue({
      name: TESTING_QUEUE,
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, TestingProcessor],
  exports: [QueueService],
})
export class QueueModule {}
