import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsService } from '../auctions.service';

describe('AuctionsService', () => {
  let auctionsService: AuctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionsService],
    }).compile();

    auctionsService = module.get<AuctionsService>(AuctionsService);
  });

  describe('buildSearchOption', () => {
    it('should return searchOption w/ 3 SkillOptions', () => {
      const result = auctionsService.buildSearchOption({
        categoryCode: 123456,
        quality: 10,
        skillCodes: [1, 2, 3],
        tripodCodes: [4, 5, 6],
      });
      expect(result).toStrictEqual({
        Sort: 'BUY_PRICE',
        SortCondition: 'ASC',
        ItemTier: 3,
        PageNo: 1,
        CategoryCode: 123456,
        ItemGradeQuality: 10,
        ItemGrade: undefined,
        ItemName: undefined,
        SkillOptions: [
          {
            FirstOption: 1,
            SecondOption: 4,
            MinValue: 5,
          },
          {
            FirstOption: 2,
            SecondOption: 5,
            MinValue: 5,
          },
          {
            FirstOption: 3,
            SecondOption: 6,
            MinValue: 5,
          },
        ],
        EtcOptions: [],
      });
    });

    it('should return searchOption w/ 3 EtcOption', () => {
      const result = auctionsService.buildSearchOption({
        categoryCode: 123456,
        quality: 10,
        abilityCodes: [1, 2, 3],
      });
      expect(result).toStrictEqual({
        Sort: 'BUY_PRICE',
        SortCondition: 'ASC',
        ItemTier: 3,
        PageNo: 1,
        CategoryCode: 123456,
        ItemGradeQuality: 10,
        ItemGrade: undefined,
        ItemName: undefined,
        SkillOptions: [],
        EtcOptions: [
          {
            FirstOption: 2,
            SecondOption: 1,
          },
          {
            FirstOption: 2,
            SecondOption: 2,
          },
          {
            FirstOption: 2,
            SecondOption: 3,
          },
        ],
      });
    });
  });

  describe('parseSearchResult', () => {
    it('should return auctionItem based on searchResult', () => {
      const result = auctionsService.parseSearchResult({
        AuctionInfo: {
          BuyPrice: 1,
          StartPrice: 2,
          BidPrice: 3,
          BidStartPrice: 4,
        },
        Name: 'name',
        Grade: 'grade',
        Icon: 'icon',
        GradeQuality: 10,
        Options: [
          {
            OptionName: 'optionName1',
            OptionNameTripod: 'optionNameTripod1',
            Value: 1,
          },
          {
            OptionName: 'optionName2',
            OptionNameTripod: 'optionNameTripod2',
            Value: 2,
          },
          {
            OptionName: 'optionName3',
            OptionNameTripod: 'optionNameTripod3',
            Value: 3,
          },
        ],
      });
      expect(result).toStrictEqual({
        buyPrice: 1,
        startPrice: 2,
        currentBidPrice: 3,
        nextBidPrice: 4,
        name: 'name',
        grade: 'grade',
        iconPath: 'icon',
        quality: 10,
        itemOptions: [
          {
            name: 'optionName1',
            tripod: 'optionNameTripod1',
            value: 1,
          },
          {
            name: 'optionName2',
            tripod: 'optionNameTripod2',
            value: 2,
          },
          {
            name: 'optionName3',
            tripod: 'optionNameTripod3',
            value: 3,
          },
        ],
      });
    });
  });
});
