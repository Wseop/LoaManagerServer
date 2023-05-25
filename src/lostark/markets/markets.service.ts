import { Injectable } from '@nestjs/common';
import { MarketQueryDto } from './dto/market-query.dto';
import { MarketSearchResultDto } from './dto/market-search-result.dto';
import { MarketItemDto } from './dto/market-item.dto';
import { MarketSearchOptionDto } from './dto/market-search-option.dto';

@Injectable()
export class MarketsService {
  constructor() {}

  buildSearchOption(query: MarketQueryDto) {
    const searchOption: MarketSearchOptionDto = {
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

  parseSearchResult(searchResult: MarketSearchResultDto) {
    const marketItem: MarketItemDto = {
      itemName: searchResult.Name,
      itemGrade: searchResult.Grade,
      iconPath: searchResult.Icon,
      avgPrice: searchResult.YDayAvgPrice,
      recentPrice: searchResult.RecentPrice,
      minPrice: searchResult.CurrentMinPrice,
    };

    return marketItem;
  }
}
