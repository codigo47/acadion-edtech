import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
} from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Post('title')
  async generateTitle(@Body() generateTitleDto: GenerateTitleDto) {
    return this.courseService.generateTitle(generateTitleDto);
  }

  @Post('audience')
  async setAudience(@Body() setAudienceDto: SetAudienceDto) {
    return this.courseService.setAudience(setAudienceDto);
  }

  @Post('objective')
  async setObjective(@Body() setObjectiveDto: SetObjectiveDto) {
    return this.courseService.setObjective(setObjectiveDto);
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.courseService.findByKey(key);
  }
}
