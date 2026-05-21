import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskName } from '../enums/task-name.enum';

export class SelectedComponent {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class TaskDto {
  @IsEnum(TaskName)
  @IsNotEmpty()
  taskName: TaskName;

  // CREATE_COURSE
  @IsString()
  @IsOptional()
  userId?: string;

  // Common fields for most tasks
  @IsString()
  @IsOptional()
  courseKey?: string;

  @IsString()
  @IsOptional()
  conversationKey?: string;

  // GENERATE_TITLE
  @IsString()
  @IsOptional()
  topic?: string;

  // SET_AUDIENCE
  @IsString()
  @IsOptional()
  audience?: string;

  // SET_OBJECTIVE
  @IsString()
  @IsOptional()
  objective?: string;

  // SET_BUILDING_METHOD
  @IsString()
  @IsOptional()
  buildingMethod?: 'ai' | 'references_ai' | 'material_only';

  // SET_MODULES
  @IsNumber()
  @IsOptional()
  modulesCount?: number;

  // SET_UNITS
  @IsObject()
  @IsOptional()
  modules?: Record<number, { units: number }>;

  // SET_EVALUATION
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectedComponent)
  @IsOptional()
  selectedComponents?: SelectedComponent[];

  // SET_EVALUATION_DETAILS
  @IsBoolean()
  @IsOptional()
  knowledgeCheckEndUnit?: boolean;

  @IsBoolean()
  @IsOptional()
  knowledgeCheckEndModule?: boolean;

  @IsBoolean()
  @IsOptional()
  finalExercise?: boolean;

  @IsString()
  @IsOptional()
  restrictions?: string;

  // SET_BRANDING
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  typo1?: string;

  @IsString()
  @IsOptional()
  typo2?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  guidelines?: string;
}
