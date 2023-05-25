import { Injectable } from '@nestjs/common';
import { AuctionQueryDto } from './dto/auction-query.dto';

@Injectable()
export class AuctionsService {
  constructor() {}

  buildSearchOption(query: AuctionQueryDto) {
    const searchOption = {
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

  parseSearchResult(searchResult) {
    const auctionItem = {
      buyPrice: searchResult.AuctionInfo.BuyPrice,
      startPrice: searchResult.AuctionInfo.StartPrice,
      currentBidPrice: searchResult.AuctionInfo.BidPrice,
      nextBidPrice: searchResult.AuctionInfo.BidStartPrice,
      name: searchResult.Name,
      grade: searchResult.Grade,
      iconPath: searchResult.Icon,
      quality: searchResult.GradeQuality,
      itemOptions: [],
    };

    searchResult.Options.forEach((option) => {
      auctionItem.itemOptions.push({
        name: option.OptionName,
        tripod: option.OptionNameTripod,
        value: option.Value,
      });
    });

    return auctionItem;
  }
}
