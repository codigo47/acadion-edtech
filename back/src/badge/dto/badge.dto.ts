import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsObject,
} from 'class-validator';

export enum BadgeTypeEnum {
  progress = 'progress',
  level = 'level',
  excellence = 'excellence',
  role = 'role',
}

export class CreateBadgeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(BadgeTypeEnum)
  type: BadgeTypeEnum;

  @IsString()
  conditionType: string;

  @IsOptional()
  @IsObject()
  conditionValue?: Record<string, any>;

  @IsOptional()
  @IsInt()
  targetId?: number;

  @IsInt()
  orgId: number;
}

export class UpdateBadgeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(BadgeTypeEnum)
  type?: BadgeTypeEnum;

  @IsOptional()
  @IsString()
  conditionType?: string;

  @IsOptional()
  @IsObject()
  conditionValue?: Record<string, any>;

  @IsOptional()
  @IsInt()
  targetId?: number;
}
