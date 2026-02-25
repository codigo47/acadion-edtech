import { Module } from '@nestjs/common';
import { LmsController } from './lms.controller';
import { LmsService } from './lms.service';
import { AdaptiveService } from './adaptive.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BadgeModule } from '../badge/badge.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, BadgeModule, NotificationModule],
  controllers: [LmsController],
  providers: [LmsService, AdaptiveService],
  exports: [LmsService],
})
export class LmsModule {}
