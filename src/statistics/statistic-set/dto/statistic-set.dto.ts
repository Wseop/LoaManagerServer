import { ApiProperty } from '@nestjs/swagger';
import { SetCount } from '../interfaces/set-count.interface';

export class StatisticSetDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [SetCount] })
  setCounts: SetCount[];
}
