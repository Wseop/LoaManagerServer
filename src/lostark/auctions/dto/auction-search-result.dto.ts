interface AuctionInfo {
  StartPrice: number;
  BuyPrice: number;
  BidPrice: number;
  EndDate: Date;
  BidCount: number;
  BidStartPrice: number;
  IsCompetitive: boolean;
  TradeAllowCount: number;
}

interface ItemOption {
  Type: string;
  OptionName: string;
  OptionNameTripod: string;
  Value: number;
  IsPenalty: boolean;
  ClassName: string;
}

export class AuctionSearchResultDto {
  Name: string;
  Grade: string;
  Tier: number;
  Level: number;
  Icon: string;
  GradeQuality: number;
  AuctionInfo: AuctionInfo;
  Options: ItemOption[];
}
