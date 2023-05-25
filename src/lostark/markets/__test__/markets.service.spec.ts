import { Test, TestingModule } from '@nestjs/testing';
import { MarketsService } from '../markets.service';

describe('MarketsService', () => {
  let marketsService: MarketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketsService],
    }).compile();

    marketsService = module.get<MarketsService>(MarketsService);
  });

  describe('buildSearchOption', () => {
    it('should return searchOption', () => {
      const result = marketsService.buildSearchOption({
        categoryCode: 123456,
        className: 'className',
        itemName: 'itemName',
      });
      expect(result).toStrictEqual({
        Sort: 'CURRENT_MIN_PRICE ',
        SortCondition: 'ASC',
        PageNo: 1,
        CategoryCode: 123456,
        CharacterClass: 'className',
        ItemGrade: undefined,
        ItemName: 'itemName',
      });
    });
  });

  describe('parseSearchResult', () => {
    it('should return marketItem based on searchResult', () => {
      const result = marketsService.parseSearchResult({
        Name: 'name',
        Grade: 'grade',
        Icon: 'icon',
        RecentPrice: 10,
        CurrentMinPrice: 5,
      });
      expect(result).toStrictEqual({
        name: 'name',
        grade: 'grade',
        iconPath: 'icon',
        recentPrice: 10,
        minPrice: 5,
      });
    });
  });
});
