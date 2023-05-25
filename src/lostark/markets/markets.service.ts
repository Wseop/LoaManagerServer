import { Injectable } from '@nestjs/common';
import { MarketQueryDto } from './dto/market-query.dto';

@Injectable()
export class MarketsService {
  constructor() {}

  buildSearchOption(query: MarketQueryDto) {
    const searchOption = {
      Sort: 'CURRENT_MIN_PRICE ',
      SortCondition: 'ASC',
      PageNo: 1,
      CategoryCode: query.categoryCode,
      CharacterClass: query.className,
      ItemGrade: query.itemGrade,
      ItemName: query.itemName,
    };

    return searchOption;
  }

  parseSearchResult(searchResult) {
    const marketItem = {
      name: searchResult.Name,
      grade: searchResult.Grade,
      iconPath: searchResult.Icon,
      recentPrice: searchResult.RecentPrice,
      minPrice: searchResult.CurrentMinPrice,
    };

    return marketItem;
  }
}
