import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LmsService } from './lms.service';
import { AdaptiveService } from './adaptive.service';
import {
  UpdateProgressDto,
  CompleteCourseDto,
  SubmitKnowledgeCheckDto,
  AdminEnrollDto,
  SubmitPreAssessmentDto,
  SubmitPostAssessmentDto,
} from './dto/lms.dto';

interface RequestWithUser extends ExpressRequest {
  user: { id: string };
}

@Controller('lms')
@UseGuards(JwtAuthGuard)
export class LmsController {
  constructor(
    private readonly lmsService: LmsService,
    private readonly adaptiveService: AdaptiveService,
  ) {}

  @Get('dashboard')
  getStudentDashboard(@Request() req: RequestWithUser) {
    return this.lmsService.getStudentDashboard(req.user.id);
  }

  @Get('courses/:key')
  getCourseContent(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
  ) {
    return this.lmsService.getCourseContent(key, req.user.id);
  }

  @Post('courses/:key/enroll')
  selfEnroll(@Param('key') key: string, @Request() req: RequestWithUser) {
    return this.lmsService.selfEnroll(key, req.user.id);
  }

  @Patch('courses/:key/progress')
  updateProgress(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.lmsService.updateProgress(key, req.user.id, dto);
  }

  @Post('courses/:key/complete')
  completeCourse(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
    @Body() dto: CompleteCourseDto,
  ) {
    return this.lmsService.completeCourse(key, req.user.id, dto);
  }

  @Post('courses/:key/knowledge-check')
  submitKnowledgeCheck(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
    @Body() dto: SubmitKnowledgeCheckDto,
  ) {
    return this.lmsService.submitKnowledgeCheck(key, req.user.id, dto);
  }

  @Post('courses/:key/admin-enroll')
  adminEnroll(
    @Param('key') key: string,
    @Body() dto: AdminEnrollDto,
  ) {
    return this.lmsService.adminEnroll(key, dto);
  }

  @Post('courses/:key/re-enroll/:userId')
  adminReEnroll(
    @Param('key') key: string,
    @Param('userId') userId: string,
  ) {
    return this.lmsService.adminReEnroll(key, userId);
  }

  // Adaptive learning endpoints
  @Get('courses/:key/pre-assessment')
  getPreAssessment(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
  ) {
    return this.adaptiveService.getPreAssessment(key, req.user.id);
  }

  @Post('courses/:key/pre-assessment')
  submitPreAssessment(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
    @Body() dto: SubmitPreAssessmentDto,
  ) {
    return this.adaptiveService.submitPreAssessment(
      dto.enrollmentId,
      req.user.id,
      dto.answers,
    );
  }

  @Get('courses/:key/post-assessment')
  getPostAssessment(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
  ) {
    return this.adaptiveService.getPostAssessment(key, req.user.id);
  }

  @Post('courses/:key/post-assessment')
  submitPostAssessment(
    @Param('key') key: string,
    @Request() req: RequestWithUser,
    @Body() dto: SubmitPostAssessmentDto,
  ) {
    return this.adaptiveService.submitPostAssessment(
      dto.enrollmentId,
      req.user.id,
      dto.answers,
    );
  }
}
