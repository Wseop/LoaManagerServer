import { ApiProperty } from '@nestjs/swagger';

class ChaosItemCounts {
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

export class StatisticsChaosDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  level: string;

  @ApiProperty({ type: ChaosItemCounts })
  itemCounts: ChaosItemCounts;
}
