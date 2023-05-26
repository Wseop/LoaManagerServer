class ItemOption {
  optionName: string;
  tripod: string;
  value: number;
}

export class AuctionItemDto {
  buyPrice: number;
  startPrice: number;
  currentBidPrice: number;
  nextBidPrice: number;
  itemName: string;
  itemGrade: string;
  iconPath: string;
  quality: number;
  itemOptions: ItemOption[];
}
