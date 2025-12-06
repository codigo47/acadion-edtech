import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GenerateTitleDto {
  @IsString()
  @IsNotEmpty()
  courseKey: string;

  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}

export class SetAudienceDto {
  @IsString()
  @IsNotEmpty()
  courseKey: string;

  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsString()
  @IsNotEmpty()
  audience: string;
}

export class SetObjectiveDto {
  @IsString()
  @IsNotEmpty()
  courseKey: string;

  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsString()
  @IsNotEmpty()
  objective: string;
}
