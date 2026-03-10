import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GroupService } from './group.service';
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddGroupMemberDto,
} from './dto/group.dto';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('org/:orgKey')
  getOrgGroups(@Param('orgKey') orgKey: string) {
    return this.groupService.getOrgGroups(orgKey);
  }

  @Get(':id')
  getGroupDetail(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.getGroupDetail(id);
  }

  @Post('org/:orgKey')
  createGroup(
    @Param('orgKey') orgKey: string,
    @Body() dto: CreateGroupDto,
  ) {
    return this.groupService.createGroup(orgKey, dto);
  }

  @Patch(':id')
  updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id, dto);
  }

  @Delete(':id')
  deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.deleteGroup(id);
  }

  @Post(':id/members')
  addMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddGroupMemberDto,
  ) {
    return this.groupService.addMember(id, dto);
  }

  @Delete(':id/members/:userId')
  removeMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId') userId: string,
  ) {
    return this.groupService.removeMember(id, userId);
  }
}
