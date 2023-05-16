import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { SkillElement } from '../schemas/skill.schema';

export class SkillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty({ type: [SkillElement] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  skills: SkillElement[];
}
