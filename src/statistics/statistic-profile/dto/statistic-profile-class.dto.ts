import { ApiProperty } from '@nestjs/swagger';
import { ClassEngraveCount } from '../interfaces/class-engrave-count.interface';

export class StatisticProfileClassDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [ClassEngraveCount] })
  classEngraveCounts: ClassEngraveCount[];
}
