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
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LearningPlanService } from './learning-plan.service';
import {
  CreateLearningPlanDto,
  UpdateLearningPlanDto,
  AddPlanCourseDto,
  ReorderPlanCoursesDto,
  AssignPlanDto,
  AssignPlanToGroupDto,
} from './dto/learning-plan.dto';

interface RequestWithUser extends ExpressRequest {
  user: { id: string };
}

@Controller('learning-plans')
@UseGuards(JwtAuthGuard)
export class LearningPlanController {
  constructor(
    private readonly learningPlanService: LearningPlanService,
  ) {}

  @Get('org/:orgKey')
  getOrgPlans(@Param('orgKey') orgKey: string) {
    return this.learningPlanService.getOrgPlans(orgKey);
  }

  @Get(':id')
  getPlanDetail(@Param('id', ParseIntPipe) id: number) {
    return this.learningPlanService.getPlanDetail(id);
  }

  @Post('org/:orgKey')
  createPlan(
    @Param('orgKey') orgKey: string,
    @Body() dto: CreateLearningPlanDto,
  ) {
    return this.learningPlanService.createPlan(orgKey, dto);
  }

  @Patch(':id')
  updatePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLearningPlanDto,
  ) {
    return this.learningPlanService.updatePlan(id, dto);
  }

  @Delete(':id')
  deletePlan(@Param('id', ParseIntPipe) id: number) {
    return this.learningPlanService.deletePlan(id);
  }

  @Post(':id/courses')
  addCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddPlanCourseDto,
  ) {
    return this.learningPlanService.addCourse(id, dto);
  }

  @Delete(':id/courses/:courseId')
  removeCourse(
    @Param('id', ParseIntPipe) id: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.learningPlanService.removeCourse(id, courseId);
  }

  @Patch(':id/courses/reorder')
  reorderCourses(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReorderPlanCoursesDto,
  ) {
    return this.learningPlanService.reorderCourses(id, dto);
  }

  @Post(':id/assign')
  assignToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignPlanDto,
  ) {
    return this.learningPlanService.assignToUser(id, dto);
  }

  @Post(':id/assign-group')
  assignToGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignPlanToGroupDto,
  ) {
    return this.learningPlanService.assignToGroup(id, dto);
  }

  @Get(':id/student')
  getStudentPlanDetail(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.learningPlanService.getStudentPlanDetail(id, req.user.id);
  }
}
