import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9_-]{3,30}$/, {
    message:
      'Username must be 3-30 characters: lowercase letters, numbers, hyphens and underscores only',
  })
  username?: string;
}
