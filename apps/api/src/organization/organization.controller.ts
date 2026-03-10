import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationService } from './organization.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import {
  CreateOrganizationDto,
  InviteMemberDto,
  UpdateMemberRoleDto,
  AcceptInvitationDto,
  BulkInviteMembersDto,
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
  @Post('invitations/accept')
  acceptInvitation(
    @Request() req: RequestWithUser,
    @Body() dto: AcceptInvitationDto,
  ) {
    return this.organizationService.acceptInvitation(dto.token, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':key')
  getOrganization(@Param('key') key: string) {
    return this.organizationService.getOrganization(key);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':key/members')
  getMembers(
    @Param('key') key: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.organizationService.getMembers(key, pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':key/members/bulk')
  bulkInviteMembers(
    @Param('key') key: string,
    @Body() dto: BulkInviteMembersDto,
    @Request() req: RequestWithUser,
  ) {
    return this.organizationService.bulkInviteMembers(key, dto.members, req.user.id);
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
