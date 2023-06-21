import { ApiProperty } from '@nestjs/swagger';

export class StatisticGuardianDto {
  @ApiProperty()
  level: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  destructionStone: number;

  @ApiProperty()
  protectionStone: number;

  @ApiProperty()
  leapStone: number;
}
