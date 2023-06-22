class SearchDetailOption {
  FirstOption: number;
  SecondOption: number;
  MinValue?: number;
  MaxValue?: number;
}

export class AuctionSearchOption {
  Sort: string;
  SortCondition: string;
  ItemTier: number;
  PageNo: number;
  CategoryCode: number;
  ItemGradeQuality: number;
  ItemGrade: string;
  ItemName: string;
  SkillOptions: SearchDetailOption[];
  EtcOptions: SearchDetailOption[];
}
