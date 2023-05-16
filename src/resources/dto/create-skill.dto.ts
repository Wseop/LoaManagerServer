import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SkillElement } from '../schemas/skill.schema';
import { Type } from 'class-transformer';

export class CreateSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty({ type: [SkillElement] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SkillElement)
  skills: SkillElement[];
}
