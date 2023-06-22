import { ApiProperty } from '@nestjs/swagger';

class ItemOption {
  @ApiProperty()
  optionName: string;

  @ApiProperty()
  tripod: string;

  @ApiProperty()
  value: number;
}

export class AuctionItemDto {
  @ApiProperty()
  buyPrice: number;

  @ApiProperty()
  startPrice: number;

  @ApiProperty()
  currentBidPrice: number;

  @ApiProperty()
  nextBidPrice: number;

  @ApiProperty()
  itemName: string;

  @ApiProperty()
  itemGrade: string;

  @ApiProperty()
  iconPath: string;

  @ApiProperty()
  quality: number;

  @ApiProperty({ type: [ItemOption] })
  itemOptions: ItemOption[];
}
