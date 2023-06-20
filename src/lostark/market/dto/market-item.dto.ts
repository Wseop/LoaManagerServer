import { ApiProperty } from '@nestjs/swagger';

export class MarketItemDto {
  @ApiProperty()
  itemName: string;

  @ApiProperty()
  itemGrade: string;

  @ApiProperty()
  iconPath: string;

  @ApiProperty()
  avgPrice: number;

  @ApiProperty()
  recentPrice: number;

  @ApiProperty()
  minPrice: number;
}
