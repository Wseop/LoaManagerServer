import { ApiProperty } from '@nestjs/swagger';
import { EngraveCount } from '../interfaces/engrave-count.interface';

export class StatisticEngraveDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [EngraveCount] })
  engraveCounts: EngraveCount[];
}
