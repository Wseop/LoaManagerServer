import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SkillElement } from '../interfaces/skill.interface';

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
