import { ApiProperty } from '@nestjs/swagger';
import { ClassCount } from '../interfaces/class-count.interface';

export class StatisticProfileClassDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [ClassCount] })
  classCounts: ClassCount[];
}
