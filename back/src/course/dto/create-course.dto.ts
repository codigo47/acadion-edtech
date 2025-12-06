import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

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

export class SetBuildingMethodDto {
  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsString()
  @IsNotEmpty()
  buildingMethod: 'ai' | 'references_ai' | 'material_only';
}

export class SetModulesDto {
  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsNumber()
  @IsNotEmpty()
  modulesCount: number;
}

export class SetUnitsDto {
  @IsString()
  @IsNotEmpty()
  conversationKey: string;

  @IsObject()
  @IsNotEmpty()
  modules: Record<number, { units: number }>;
}
