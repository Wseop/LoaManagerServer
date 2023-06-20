import { Injectable } from '@nestjs/common';
import { MarketQueryDto } from './dto/market-query.dto';
import { MarketSearchResult } from './interfaces/market-search-result.interface';
import { MarketItemDto } from './dto/market-item.dto';
import { MarketSearchOption } from './interfaces/market-search-option.interface';
import { ApiRequestService } from '../api-request/api-request.service';

@Injectable()
export class MarketService {
  constructor(private readonly apiRequestService: ApiRequestService) {}

  async searchMarketItems(query: MarketQueryDto): Promise<MarketItemDto[]> {
    const url = 'https://developer-lostark.game.onstove.com/markets/items';
    const searchOption: MarketSearchOption = this.buildSearchOption(query);
    const marketItems: MarketItemDto[] = [];

    if (query.pageAll) {
      let pageNo = 1;

      while (pageNo <= 10) {
        searchOption.PageNo = pageNo++;

        const result = await this.apiRequestService.post(url, searchOption);
        if (result.data.Items.length === 0) break;

        result.data.Items.forEach((item) => {
          marketItems.push(this.parseSearchResult(item));
        });
      }
    } else {
      const result = await this.apiRequestService.post(url, searchOption);

      result.data.Items?.forEach((item) => {
        marketItems.push(this.parseSearchResult(item));
      });
    }

    return marketItems;
  }

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
