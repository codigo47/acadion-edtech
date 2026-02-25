import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BadgeService } from './badge.service';
import { CreateBadgeDto, UpdateBadgeDto } from './dto/badge.dto';
import { PrismaService } from '../prisma/prisma.service';

interface RequestWithUser extends ExpressRequest {
  user: { id: string };
}

@Controller('badges')
@UseGuards(JwtAuthGuard)
export class BadgeController {
  constructor(
    private readonly badgeService: BadgeService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('me')
  getMyBadges(@Request() req: RequestWithUser) {
    return this.badgeService.getMyBadges(req.user.id);
  }

  @Get('org/:orgKey')
  getOrgBadges(@Param('orgKey') orgKey: string) {
    return this.badgeService.getOrgBadges(orgKey);
  }

  @Post('org/:orgKey')
  async createBadge(
    @Param('orgKey') orgKey: string,
    @Body() dto: CreateBadgeDto,
  ) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');
    dto.orgId = org.id;
    return this.badgeService.createBadge(dto);
  }

  @Patch(':id')
  updateBadge(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBadgeDto,
  ) {
    return this.badgeService.updateBadge(id, dto);
  }

  @Delete(':id')
  deleteBadge(@Param('id', ParseIntPipe) id: number) {
    return this.badgeService.deleteBadge(id);
  }
}
