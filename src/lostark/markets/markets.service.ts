import { Injectable } from '@nestjs/common';
import { MarketQueryDto } from './dto/market-query.dto';
import { MarketSearchResult } from './interfaces/market-search-result.interface';
import { MarketItemDto } from './dto/market-item.dto';
import { MarketSearchOption } from './interfaces/market-search-option.interface';

@Injectable()
export class MarketsService {
  constructor() {}

  buildSearchOption(query: MarketQueryDto): MarketSearchOption {
    const searchOption: MarketSearchOption = {
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

  parseSearchResult(searchResult: MarketSearchResult): MarketItemDto {
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
