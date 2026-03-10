import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import {
  UpdatePortfolioDto,
  UpdatePortfolioCoursesDto,
} from './dto/update-portfolio.dto';
import { ContactPortfolioDto } from './dto/contact-portfolio.dto';
import { TrackVisitDto } from './dto/track-visit.dto';

interface RequestWithUser extends ExpressRequest {
  user: { id: string; email: string };
}

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // --- Authenticated routes (must come before :username) ---

  @UseGuards(JwtAuthGuard)
  @Get('me/settings')
  getMyPortfolio(@Request() req: RequestWithUser) {
    return this.portfolioService.getMyPortfolio(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/settings')
  updatePortfolio(
    @Request() req: RequestWithUser,
    @Body() dto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.upsertPortfolio(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/courses')
  updateCourses(
    @Request() req: RequestWithUser,
    @Body() dto: UpdatePortfolioCoursesDto,
  ) {
    return this.portfolioService.updateCourses(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/analytics')
  getAnalytics(@Request() req: RequestWithUser) {
    return this.portfolioService.getPortfolioAnalytics(req.user.id);
  }

  // --- Public routes ---

  @Get(':username')
  getByUsername(@Param('username') username: string) {
    return this.portfolioService.getByUsername(username);
  }

  @Post(':username/visit')
  @HttpCode(HttpStatus.CREATED)
  trackVisit(
    @Param('username') username: string,
    @Body() dto: TrackVisitDto,
  ) {
    return this.portfolioService.trackVisit(username, dto);
  }

  @Post(':username/contact')
  @HttpCode(HttpStatus.CREATED)
  sendContact(
    @Param('username') username: string,
    @Body() dto: ContactPortfolioDto,
  ) {
    return this.portfolioService.sendContactMessage(username, dto);
  }
}
