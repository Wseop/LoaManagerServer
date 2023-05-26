import { Test, TestingModule } from '@nestjs/testing';
import { LostarkController } from '../lostark.controller';
import { LostarkService } from '../lostark.service';
import { CreateApiKeyDto } from '../api-keys/dto/create-api-key.dto';

class MockLostarkService {
  createApiKey = jest.fn((createApiKey: CreateApiKeyDto) => createApiKey);
  getCharacterInfo = jest.fn().mockReturnValue({
    profile: {
      expeditionLevel: 300,
      title: '섬뜩한 유물광',
      guildName: 'Floresta',
      usingSkillPoint: 416,
      totalSkillPoint: 420,
      stats: {
        치명: 65,
        특화: 637,
        제압: 70,
        신속: 1758,
        인내: 66,
        숙련: 66,
        '최대 생명력': 240635,
        공격력: 50831,
      },
      serverName: '아만',
      characterName: '쿠키바닐라쉐이크',
      characterLevel: 60,
      className: '홀리나이트',
      itemLevel: 1620,
    },
    skills: [
      {
        skillName: '집행자의 검',
        skillLevel: 12,
        tripods: [
          {
            tripodName: '탁월한 기동성',
            tripodLevel: 1,
          },
          {
            tripodName: '부위파괴 강화',
            tripodLevel: 1,
          },
          {
            tripodName: '집행자의 일격',
            tripodLevel: 5,
          },
        ],
        rune: {
          runeName: '압도',
          grade: '전설',
          iconPath:
            'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_7_203.png',
        },
      },
    ],
    engraves: [
      {
        name: '축복의 오라',
        level: 3,
      },
    ],
    cards: [
      {
        cardSet: '남겨진 바람의 절벽 6세트',
        awaken: 30,
      },
    ],
    collectibles: [
      {
        type: '모코코 씨앗',
        point: 1367,
        maxPoint: 1367,
      },
    ],
    gems: [
      {
        type: '홍염',
        level: 8,
        iconPath:
          'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_63.png',
        grade: '전설',
        skillName: '빛의 충격',
      },
    ],
    equipments: {
      무기: {
        type: '무기',
        name: '+19 사로잡힌 광기의 갈망 한손검',
        iconPath:
          'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/HK_Item/HK_Item_136.png',
        grade: '고대',
        quality: 94,
        itemLevel: 1620,
        itemSet: {
          name: '갈망',
          level: '3',
        },
      },
    },
  });
  getSiblings = jest.fn().mockReturnValue([
    {
      serverName: '아만',
      characterName: '솔티드캬라멜쉐이크',
      characterLevel: 60,
      className: '슬레이어',
      itemLevel: '1,563.33',
    },
  ]);
  searchAuctionItems = jest.fn().mockReturnValue([
    {
      buyPrice: 19,
      startPrice: 19,
      currentBidPrice: 0,
      nextBidPrice: 19,
      name: '1레벨 홍염의 보석',
      grade: '고급',
      iconPath:
        'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_56.png',
      quality: null,
      itemOptions: [
        {
          name: '중력 가중 스킬',
          tripod: '',
          value: 2,
        },
      ],
    },
  ]);
  searchMarketItems = jest.fn().mockReturnValue([
    {
      name: '구슬동자 각인서',
      grade: '고급',
      iconPath:
        'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/All_Quest/All_Quest_01_154.png',
      recentPrice: 1,
      minPrice: 1,
    },
  ]);
}

describe('LostarkController', () => {
  let lostarkController: LostarkController;
  let lostarkService: LostarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LostarkController],
      providers: [
        {
          provide: LostarkService,
          useClass: MockLostarkService,
        },
      ],
    }).compile();

    lostarkController = module.get<LostarkController>(LostarkController);
    lostarkService = module.get<LostarkService>(LostarkService);
  });

  describe('GET', () => {
    it('should return characterInfo', () => {
      const result = lostarkController.getCharacterInfo('characterName');
      expect(result).toStrictEqual({
        profile: {
          expeditionLevel: 300,
          title: '섬뜩한 유물광',
          guildName: 'Floresta',
          usingSkillPoint: 416,
          totalSkillPoint: 420,
          stats: {
            치명: 65,
            특화: 637,
            제압: 70,
            신속: 1758,
            인내: 66,
            숙련: 66,
            '최대 생명력': 240635,
            공격력: 50831,
          },
          serverName: '아만',
          characterName: '쿠키바닐라쉐이크',
          characterLevel: 60,
          className: '홀리나이트',
          itemLevel: 1620,
        },
        skills: [
          {
            skillName: '집행자의 검',
            skillLevel: 12,
            tripods: [
              {
                tripodName: '탁월한 기동성',
                tripodLevel: 1,
              },
              {
                tripodName: '부위파괴 강화',
                tripodLevel: 1,
              },
              {
                tripodName: '집행자의 일격',
                tripodLevel: 5,
              },
            ],
            rune: {
              runeName: '압도',
              grade: '전설',
              iconPath:
                'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_7_203.png',
            },
          },
        ],
        engraves: [
          {
            name: '축복의 오라',
            level: 3,
          },
        ],
        cards: [
          {
            cardSet: '남겨진 바람의 절벽 6세트',
            awaken: 30,
          },
        ],
        collectibles: [
          {
            type: '모코코 씨앗',
            point: 1367,
            maxPoint: 1367,
          },
        ],
        gems: [
          {
            type: '홍염',
            level: 8,
            iconPath:
              'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_63.png',
            grade: '전설',
            skillName: '빛의 충격',
          },
        ],
        equipments: {
          무기: {
            type: '무기',
            name: '+19 사로잡힌 광기의 갈망 한손검',
            iconPath:
              'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/HK_Item/HK_Item_136.png',
            grade: '고대',
            quality: 94,
            itemLevel: 1620,
            itemSet: {
              name: '갈망',
              level: '3',
            },
          },
        },
      });
      expect(jest.spyOn(lostarkService, 'getCharacterInfo')).toBeCalledTimes(1);
    });

    it('should return siblings', () => {
      const result = lostarkController.getSiblings('characterName');
      expect(result).toStrictEqual([
        {
          serverName: '아만',
          characterName: '솔티드캬라멜쉐이크',
          characterLevel: 60,
          className: '슬레이어',
          itemLevel: '1,563.33',
        },
      ]);
      expect(jest.spyOn(lostarkService, 'getSiblings')).toBeCalledTimes(1);
    });

    it('should return auctionItems', () => {
      const result = lostarkController.searchAuctionItems({
        categoryCode: 1111,
      });
      expect(result).toStrictEqual([
        {
          buyPrice: 19,
          startPrice: 19,
          currentBidPrice: 0,
          nextBidPrice: 19,
          name: '1레벨 홍염의 보석',
          grade: '고급',
          iconPath:
            'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_9_56.png',
          quality: null,
          itemOptions: [
            {
              name: '중력 가중 스킬',
              tripod: '',
              value: 2,
            },
          ],
        },
      ]);
      expect(jest.spyOn(lostarkService, 'searchAuctionItems')).toBeCalledTimes(
        1,
      );
    });

    it('should return marketItems', () => {
      const result = lostarkController.searchMarketItems({
        categoryCode: 1111,
      });
      expect(result).toStrictEqual([
        {
          name: '구슬동자 각인서',
          grade: '고급',
          iconPath:
            'https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/All_Quest/All_Quest_01_154.png',
          recentPrice: 1,
          minPrice: 1,
        },
      ]);
      expect(jest.spyOn(lostarkService, 'searchMarketItems')).toBeCalledTimes(
        1,
      );
    });
  });

  describe('POST', () => {
    it('should return apiKey', () => {
      const result = lostarkController.createApiKey({ apiKey: 'apiKey' });
      expect(result).toStrictEqual({ apiKey: 'apiKey' });
      expect(jest.spyOn(lostarkService, 'createApiKey')).toBeCalledTimes(1);
    });
  });
});
