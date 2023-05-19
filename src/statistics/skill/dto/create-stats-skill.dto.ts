import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StatsSkillElement } from '../schemas/stats-skill.schema';
import { Type } from 'class-transformer';

export class CreateStatsSkillDto {
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

  @ApiProperty({ type: [StatsSkillElement] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StatsSkillElement)
  skills: StatsSkillElement[];
}
