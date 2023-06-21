import { ApiProperty } from '@nestjs/swagger';
import { ElixirCount } from '../interfaces/elixir-count.interface';

export class StatisticElixirDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [ElixirCount] })
  elixirCounts: ElixirCount[];
}
