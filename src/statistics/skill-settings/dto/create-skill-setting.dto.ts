import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SkillUsage } from '../schemas/skill-setting.schema';

export class CreateSkillSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  classEngraves: string[];

  @ApiProperty({ type: [SkillUsage] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SkillUsage)
  skillUsages: SkillUsage[];
}
