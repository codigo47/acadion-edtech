import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateJobDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}
