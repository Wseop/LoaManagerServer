import { Injectable } from '@nestjs/common';
import { AuctionQueryDto } from './dto/auction-query.dto';
import { AuctionSearchResultDto } from './dto/auction-search-result.dto';
import { AuctionItemDto } from './dto/auction-item.dto';
import { AuctionSearchOptionDto } from './dto/auction-search-option.dto';

@Injectable()
export class AuctionsService {
  constructor() {}

  buildSearchOption(query: AuctionQueryDto) {
    const searchOption: AuctionSearchOptionDto = {
      Sort: 'BUY_PRICE',
      SortCondition: 'ASC',
      ItemTier: 3,
      PageNo: 1,
      CategoryCode: query.categoryCode,
      ItemGradeQuality: query.quality,
      ItemGrade: query.itemGrade,
      ItemName: query.itemName,
      SkillOptions: [],
      EtcOptions: [],
    };

    if (query.skillCodes) {
      if (query.skillCodes.length === query.tripodCodes?.length) {
        query.skillCodes.forEach((skillCode, i) => {
          searchOption.SkillOptions.push({
            FirstOption: skillCode,
            SecondOption: query.tripodCodes[i],
            MinValue: 5,
          });
        });
      }
    }

    if (query.abilityCodes) {
      query.abilityCodes.forEach((abilityCode) => {
        searchOption.EtcOptions.push({
          FirstOption: 2,
          SecondOption: abilityCode,
        });
      });
    }

    if (query.engraveCodes) {
      query.engraveCodes.forEach((engraveCode) => {
        searchOption.EtcOptions.push({
          FirstOption: 3,
          SecondOption: engraveCode,
        });
      });
    }

    return searchOption;
  }

  parseSearchResult(searchResult: AuctionSearchResultDto) {
    const auctionItem: AuctionItemDto = {
      buyPrice: searchResult.AuctionInfo.BuyPrice,
      startPrice: searchResult.AuctionInfo.StartPrice,
      currentBidPrice: searchResult.AuctionInfo.BidPrice,
      nextBidPrice: searchResult.AuctionInfo.BidStartPrice,
      itemName: searchResult.Name,
      itemGrade: searchResult.Grade,
      iconPath: searchResult.Icon,
      quality: searchResult.GradeQuality,
      itemOptions: [],
    };

    searchResult.Options.forEach((option) => {
      auctionItem.itemOptions.push({
        optionName: option.OptionName,
        tripod: option.OptionNameTripod,
        value: option.Value,
      });
    });

    return auctionItem;
  }
}
