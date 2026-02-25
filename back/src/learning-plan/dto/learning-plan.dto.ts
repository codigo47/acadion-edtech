import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLearningPlanDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  badgeImage?: string;

  @IsString()
  @IsOptional()
  badgeName?: string;

  @IsNumber()
  @IsOptional()
  estimatedDays?: number;

  @IsBoolean()
  @IsOptional()
  isCorrelative?: boolean;

  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class UpdateLearningPlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  badgeImage?: string;

  @IsString()
  @IsOptional()
  badgeName?: string;

  @IsNumber()
  @IsOptional()
  estimatedDays?: number;

  @IsBoolean()
  @IsOptional()
  isCorrelative?: boolean;

  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class AddPlanCourseDto {
  @IsInt()
  courseId: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  order?: number;

  @IsBoolean()
  @IsOptional()
  required?: boolean;
}

class CourseOrderItem {
  @IsInt()
  courseId: number;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderPlanCoursesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseOrderItem)
  courses: CourseOrderItem[];
}

export class AssignPlanDto {
  @IsString()
  userId: string;

  @IsDateString()
  @IsOptional()
  deadline?: string;
}

export class AssignPlanToGroupDto {
  @IsInt()
  groupId: number;

  @IsDateString()
  @IsOptional()
  deadline?: string;
}
