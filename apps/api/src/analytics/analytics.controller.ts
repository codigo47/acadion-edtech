import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('course/:key')
  getCourseAnalytics(@Param('key') key: string) {
    return this.analyticsService.getCourseAnalytics(key);
  }

  @Get('course/:key/users')
  getCourseUserProgress(@Param('key') key: string) {
    return this.analyticsService.getCourseUserProgress(key);
  }

  @Get('org/:orgKey')
  getOrgAnalytics(@Param('orgKey') orgKey: string) {
    return this.analyticsService.getOrgAnalytics(orgKey);
  }

  @Get('me')
  getStudentAnalytics(@Req() req: { user: { id: string } }) {
    return this.analyticsService.getStudentAnalytics(req.user.id);
  }
}
