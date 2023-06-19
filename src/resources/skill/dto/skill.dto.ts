import { ApiProperty } from '@nestjs/swagger';
import { SkillElement } from '../interfaces/skill.interface';

export class SkillDto {
  @ApiProperty()
  className: string;

  @ApiProperty({ type: [SkillElement] })
  skills: SkillElement[];
}
