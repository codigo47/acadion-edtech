import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9_-]{3,30}$/, {
    message:
      'Username must be 3-30 characters: lowercase letters, numbers, hyphens and underscores only',
  })
  username?: string;
}
