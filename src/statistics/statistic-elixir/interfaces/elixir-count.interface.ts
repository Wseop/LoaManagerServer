import { ApiProperty } from '@nestjs/swagger';

export class ElixirCount {
  @ApiProperty()
  elixir: string;

  @ApiProperty()
  count: number;
}
