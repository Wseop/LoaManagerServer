import { ApiProperty } from '@nestjs/swagger';
import { SkillCount } from '../interfaces/skill-count.interface';

export class StatisticSkillDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [SkillCount] })
  skillCounts: SkillCount[];
}
