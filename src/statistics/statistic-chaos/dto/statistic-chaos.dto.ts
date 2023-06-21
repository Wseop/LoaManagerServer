import { ApiProperty } from '@nestjs/swagger';

export class StatisticChaosDto {
  @ApiProperty()
  level: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  silling: number;

  @ApiProperty()
  shard: number;

  @ApiProperty()
  destructionStone: number;

  @ApiProperty()
  protectionStone: number;

  @ApiProperty()
  leapStone: number;

  @ApiProperty()
  gem: number;
}
