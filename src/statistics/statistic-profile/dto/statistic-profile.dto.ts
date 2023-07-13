import { ApiProperty } from '@nestjs/swagger';

export class ProfileData {
  @ApiProperty()
  count: number;

  @ApiProperty()
  value: string;
}

export class StatisticProfileDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ProfileData] })
  data: ProfileData[];
}
