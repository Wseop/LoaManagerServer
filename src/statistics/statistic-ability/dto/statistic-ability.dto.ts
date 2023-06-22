import { ApiProperty } from '@nestjs/swagger';
import { AbilityCount } from '../interfaces/ability-count.interface';

export class StatisticAbilityDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [AbilityCount] })
  abilityCounts: AbilityCount[];
}
