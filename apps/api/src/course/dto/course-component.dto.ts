import {
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateComponentDataDto {
  @IsObject()
  data: Record<string, unknown>;
}

class ReorderItem {
  @IsNumber()
  id: number;

  @IsNumber()
  sequence: number;
}

export class ReorderComponentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderItem)
  components: ReorderItem[];
}

export class SwitchStyleDto {
  @IsNumber()
  newComponentId: number;
}

export class CreateComponentDto {
  @IsString()
  componentName: string;

  @IsNumber()
  module: number;

  @IsNumber()
  unit: number;

  @IsNumber()
  afterSequence: number;
}
