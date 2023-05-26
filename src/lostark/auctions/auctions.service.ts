import { Injectable } from '@nestjs/common';
import { AuctionQueryDto } from './dto/auction-query.dto';
import { AuctionSearchResult } from './interfaces/auction-search-result.interface';
import { AuctionItemDto } from './dto/auction-item.dto';
import { AuctionSearchOption } from './interfaces/auction-search-option.interface';

@Injectable()
export class AuctionsService {
  constructor() {}

  buildSearchOption(query: AuctionQueryDto) {
    const searchOption: AuctionSearchOption = {
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
      if (query.skillCodes.length === undefined) {
        const skillCode = Number(query.skillCodes.toString());
        const tripodCode = Number(query.tripodCodes.toString());

        searchOption.SkillOptions.push({
          FirstOption: skillCode,
          SecondOption: tripodCode,
          MinValue: 5,
        });
      } else if (query.skillCodes.length === query.tripodCodes?.length) {
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
      if (query.abilityCodes.length === undefined) {
        const abilityCode = Number(query.abilityCodes.toString());

        searchOption.EtcOptions.push({
          FirstOption: 2,
          SecondOption: abilityCode,
        });
      } else {
        query.abilityCodes.forEach((abilityCode) => {
          searchOption.EtcOptions.push({
            FirstOption: 2,
            SecondOption: abilityCode,
          });
        });
      }
    }

    if (query.engraveCodes) {
      if (query.engraveCodes.length === undefined) {
        const engraveCode = Number(query.engraveCodes.toString());

        searchOption.EtcOptions.push({
          FirstOption: 3,
          SecondOption: engraveCode,
        });
      } else {
        query.engraveCodes.forEach((engraveCode) => {
          searchOption.EtcOptions.push({
            FirstOption: 3,
            SecondOption: engraveCode,
          });
        });
      }
    }

    return searchOption;
  }

  parseSearchResult(searchResult: AuctionSearchResult) {
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
