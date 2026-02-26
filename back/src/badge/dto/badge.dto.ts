import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsObject,
  IsBoolean,
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

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsInt()
  orgId?: number;
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

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AwardBadgeDto {
  @IsString()
  userId: string;
}
