import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProgressDto {
  @IsString()
  unitCode: string;

  @IsNumber()
  @Min(0)
  timeSpentSeconds: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  focusLossCount?: number;
}

export class CompleteCourseDto {
  @IsBoolean()
  passed: boolean;

  @IsNumber()
  @Min(0)
  score: number;
}

export class SubmitKnowledgeCheckDto {
  @IsString()
  unitCode: string;

  @IsInt()
  @Min(0)
  questionIndex: number;

  answer: unknown;

  @IsBoolean()
  isCorrect: boolean;
}

export class AdminEnrollDto {
  @IsString()
  userId: string;
}

class ConfidenceAnswerDto {
  @IsString()
  unitCode: string;

  @IsInt()
  @Min(1)
  @Max(5)
  confidenceScore: number;
}

export class SubmitPreAssessmentDto {
  @IsInt()
  enrollmentId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfidenceAnswerDto)
  answers: ConfidenceAnswerDto[];
}

export class SubmitPostAssessmentDto {
  @IsInt()
  enrollmentId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfidenceAnswerDto)
  answers: ConfidenceAnswerDto[];
}
