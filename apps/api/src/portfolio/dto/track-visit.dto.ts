import { IsString, IsOptional, IsInt } from 'class-validator';

export class TrackVisitDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsInt()
  @IsOptional()
  courseId?: number;
}
