import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { StatsSkillElement } from '../schemas/statsSkill.schema';

export class StatsSkillDto {
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
  @IsNotEmpty()
  @ValidateNested({ each: true })
  skills: StatsSkillElement[];
}
