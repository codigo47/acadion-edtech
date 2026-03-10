import { IsString, IsEmail } from 'class-validator';

export class ContactPortfolioDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
