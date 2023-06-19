import { ApiProperty } from '@nestjs/swagger';

class GuardianItemCounts {
  @ApiProperty()
  destructionStone: number;

  @ApiProperty()
  protectionStone: number;

  @ApiProperty()
  leapStone: number;
}

export class StatisticsGuardianDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  level: string;

  @ApiProperty({ type: GuardianItemCounts })
  itemCounts: GuardianItemCounts;
}
