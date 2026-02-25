import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationDto,
  InviteMemberDto,
  UpdateMemberRoleDto,
} from './dto/organization.dto';

interface RequestWithUser extends ExpressRequest {
  user: { id: string };
}

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: RequestWithUser, @Body() dto: CreateOrganizationDto) {
    return this.organizationService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyOrganizations(@Request() req: RequestWithUser) {
    return this.organizationService.getUserOrganizations(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':key')
  getOrganization(@Param('key') key: string) {
    return this.organizationService.getOrganization(key);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':key/members')
  inviteMember(@Param('key') key: string, @Body() dto: InviteMemberDto) {
    return this.organizationService.inviteMember(key, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':key/members/:userId/role')
  updateMemberRole(
    @Param('key') key: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.organizationService.updateMemberRole(key, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':key/members/:userId')
  removeMember(@Param('key') key: string, @Param('userId') userId: string) {
    return this.organizationService.removeMember(key, userId);
  }
}
