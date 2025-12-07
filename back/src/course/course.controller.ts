import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
  SetBuildingMethodDto,
  SetModulesDto,
  SetUnitsDto,
  SetBrandingDto,
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

  @Get(':key/objective')
  async getObjectiveStatus(@Param('key') key: string) {
    return this.courseService.getObjectiveStatus(key);
  }

  @Post(':key/building')
  async setBuildingMethod(
    @Param('key') key: string,
    @Body() dto: SetBuildingMethodDto,
  ) {
    return this.courseService.setBuildingMethod(key, dto);
  }

  @Post(':key/modules')
  async setModules(@Param('key') key: string, @Body() dto: SetModulesDto) {
    return this.courseService.setModules(key, dto);
  }

  @Post(':key/units')
  async setUnits(@Param('key') key: string, @Body() dto: SetUnitsDto) {
    return this.courseService.setUnits(key, dto);
  }

  @Get(':key/index')
  async getIndexStatus(@Param('key') key: string) {
    return this.courseService.getIndexStatus(key);
  }

  @Post(':key/indexes')
  async getExerciseTypes(
    @Param('key') key: string,
    @Body() dto: { conversationKey: string },
  ) {
    return this.courseService.getExerciseTypes(key, dto.conversationKey);
  }

  @Post(':key/evaluation')
  async setEvaluation(
    @Param('key') key: string,
    @Body() dto: { conversationKey: string; selectedComponents: Array<{ id: number; name: string }> },
  ) {
    return this.courseService.setEvaluation(key, dto.conversationKey, dto.selectedComponents);
  }

  @Post(':key/evaluation-details')
  async setEvaluationDetails(
    @Param('key') key: string,
    @Body()
    dto: {
      conversationKey: string;
      knowledgeCheckEndUnit: boolean;
      knowledgeCheckEndModule: boolean;
      finalExercise: boolean;
      restrictions: string;
    },
  ) {
    return this.courseService.setEvaluationDetails(key, dto);
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.courseService.findByKey(key);
  }

  @Post(':key/branding')
  async setBranding(@Param('key') key: string, @Body() dto: SetBrandingDto) {
    return this.courseService.setBranding(key, dto);
  }
}
