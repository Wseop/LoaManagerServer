import { ApiProperty } from '@nestjs/swagger';
import { SkillUsage } from '../schemas/skill-setting.schema';

export class SkillSettingDto {
  @ApiProperty()
  characterName: string;

  @ApiProperty()
  className: string;

  @ApiProperty()
  classEngrave: string;

  @ApiProperty({ type: [SkillUsage] })
  skillUsages: SkillUsage[];
}
