import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  IsIn,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

const VALID_THEMES = [
  'corporate_professional',
  'minimal_tech',
  'creative_modern',
  'elegant_dark',
  'vibrant_startup',
  'natural_organic',
  'casual_creative',
  'sophisticated_premium',
  'futuristic_ai',
  'editorial_blue_white',
];

export class SocialCustomLinkDto {
  @IsString()
  label: string;

  @IsString()
  url: string;
}

export class PortfolioMediaItemDto {
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdatePortfolioDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  portraitImage?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsIn(VALID_THEMES)
  @IsOptional()
  theme?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @IsString()
  @IsOptional()
  socialLinkedin?: string;

  @IsString()
  @IsOptional()
  socialTwitter?: string;

  @IsString()
  @IsOptional()
  socialInstagram?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialCustomLinkDto)
  @IsOptional()
  socialCustom?: SocialCustomLinkDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioMediaItemDto)
  @IsOptional()
  images?: PortfolioMediaItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioMediaItemDto)
  @IsOptional()
  videos?: PortfolioMediaItemDto[];

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class UpdatePortfolioCoursesDto {
  @IsArray()
  @IsInt({ each: true })
  courseIds: number[];
}
