import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Logger,
  Sse,
  MessageEvent,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { Request as ExpressRequest } from 'express';
import { Observable, map } from 'rxjs';
import { CourseService } from './course.service';
import { CourseSSEService, SSEEvent } from './course-sse.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string;
}

interface RequestWithUser extends ExpressRequest {
  user: AuthenticatedUser;
}

import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
  SetBuildingMethodDto,
  SetModulesDto,
  SetUnitsDto,
  SetEvaluationDetailsDto,
  SetBrandingDto,
} from './dto/create-course.dto';
import { TaskDto } from './dto/task.dto';
import {
  UpdateComponentDataDto,
  ReorderComponentsDto,
  SwitchStyleDto,
} from './dto/course-component.dto';
import { TaskName } from './enums/task-name.enum';

// DTOs are used via TaskDto casting in executeTask

@Controller('course')
export class CourseController {
  private readonly logger = new Logger(CourseController.name);

  constructor(
    private readonly courseService: CourseService,
    private readonly sseService: CourseSSEService,
  ) {}

  @Post('tasks')
  async executeTask(@Body() taskDto: TaskDto) {
    this.logger.log(`Executing task: ${taskDto.taskName}`);

    switch (taskDto.taskName) {
      case TaskName.CREATE_COURSE:
        this.logger.log(`Creating course for user: ${taskDto.userId}`);
        return this.courseService.create(taskDto as CreateCourseDto);

      case TaskName.GENERATE_TITLE:
        this.logger.log(
          `Generating title for course: ${taskDto.courseKey}, topic: ${taskDto.topic}`,
        );
        return this.courseService.generateTitle(taskDto as GenerateTitleDto);

      case TaskName.SET_AUDIENCE:
        this.logger.log(
          `Setting audience for course: ${taskDto.courseKey}, audience: ${taskDto.audience}`,
        );
        return this.courseService.setAudience(taskDto as SetAudienceDto);

      case TaskName.SET_OBJECTIVE:
        this.logger.log(
          `Setting objective for course: ${taskDto.courseKey}, objective: ${taskDto.objective}`,
        );
        return this.courseService.setObjective(taskDto as SetObjectiveDto);

      case TaskName.SET_BUILDING_METHOD:
        this.logger.log(
          `Setting building method for course: ${taskDto.courseKey}, method: ${taskDto.buildingMethod}`,
        );
        return this.courseService.setBuildingMethod(
          taskDto.courseKey!,
          taskDto as SetBuildingMethodDto,
        );

      case TaskName.SET_MODULES:
        this.logger.log(
          `Setting modules for course: ${taskDto.courseKey}, count: ${taskDto.modulesCount}`,
        );
        return this.courseService.setModules(
          taskDto.courseKey!,
          taskDto as SetModulesDto,
        );

      case TaskName.SET_UNITS:
        this.logger.log(
          `Setting units for course: ${taskDto.courseKey}, modules: ${JSON.stringify(taskDto.modules)}`,
        );
        return this.courseService.setUnits(
          taskDto.courseKey!,
          taskDto as SetUnitsDto,
        );

      case TaskName.GET_EXERCISE_TYPES:
        this.logger.log(
          `Getting exercise types for course: ${taskDto.courseKey}`,
        );
        return this.courseService.getExerciseTypes(
          taskDto.courseKey!,
          taskDto.conversationKey!,
        );

      case TaskName.SET_EVALUATION:
        this.logger.log(
          `Setting evaluation for course: ${taskDto.courseKey}, components: ${JSON.stringify(taskDto.selectedComponents)}`,
        );
        return this.courseService.setEvaluation(
          taskDto.courseKey!,
          taskDto.conversationKey!,
          taskDto.selectedComponents!,
        );

      case TaskName.SET_EVALUATION_DETAILS:
        this.logger.log(
          `Setting evaluation details for course: ${taskDto.courseKey}`,
        );
        return this.courseService.setEvaluationDetails(
          taskDto.courseKey!,
          taskDto as SetEvaluationDetailsDto,
        );

      case TaskName.SET_BRANDING:
        this.logger.log(`Setting branding for course: ${taskDto.courseKey}`);
        return this.courseService.setBranding(
          taskDto.courseKey!,
          taskDto as SetBrandingDto,
        );

      case TaskName.GENERATE_COURSE:
        this.logger.log(`Generating course: ${taskDto.courseKey}`);
        return this.courseService.generateCourse(taskDto.courseKey!);

      default: {
        const unknownTask: string = taskDto.taskName;
        this.logger.error(`Unknown task: ${unknownTask}`);
        throw new Error(`Unknown task: ${unknownTask}`);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() req: RequestWithUser,
    @Query() pagination: PaginationDto,
  ) {
    return this.courseService.findAllByUserId(req.user.id, pagination);
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.courseService.findByKey(key);
  }

  @Get(':key/components')
  async getCourseComponents(@Param('key') key: string) {
    return this.courseService.getCourseComponents(key);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('components/:id/data')
  async updateComponentData(
    @Param('id') id: string,
    @Body() dto: UpdateComponentDataDto,
  ) {
    return this.courseService.updateComponentData(+id, dto.data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('components/:id')
  async deleteComponent(@Param('id') id: string) {
    return this.courseService.deleteComponent(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('components/:id/duplicate')
  async duplicateComponent(@Param('id') id: string) {
    return this.courseService.duplicateComponent(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':key/components/reorder')
  async reorderComponents(
    @Param('key') key: string,
    @Body() dto: ReorderComponentsDto,
  ) {
    return this.courseService.reorderComponents(key, dto.components);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('components/:id/switch-style')
  async switchComponentStyle(
    @Param('id') id: string,
    @Body() dto: SwitchStyleDto,
  ) {
    return this.courseService.switchComponentStyle(+id, dto.newComponentId);
  }

  @Sse(':key/events')
  events(@Param('key') key: string): Observable<MessageEvent> {
    this.logger.log(`SSE connection opened for course: ${key}`);

    return this.sseService.getEventStream(key).pipe(
      map((event: SSEEvent): MessageEvent => {
        return {
          data: event,
          type: event.type,
        };
      }),
    );
  }
}
