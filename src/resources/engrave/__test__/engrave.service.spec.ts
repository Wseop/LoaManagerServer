import { Model } from 'mongoose';
import { EngraveService } from '../engrave.service';
import { Engrave } from '../schemas/engrave.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class MockEngraveModel {
  find = jest.fn().mockResolvedValue(
    [
      {
        "code": 118,
        "engraveName": "원한",
        "className": "",
        "isPenalty": false
      },
      {
        "code": 123,
        "engraveName": "굳은 의지",
        "className": "",
        "isPenalty": false
      },
      {
        "code": 237,
        "engraveName": "실드 관통",
        "className": "",
        "isPenalty": false
      },
      {
        "code": 125,
        "engraveName": "광기",
        "className": "버서커",
        "isPenalty": false
      },
      {
        "code": 127,
        "engraveName": "오의 강화",
        "className": "배틀마스터",
        "isPenalty": false
      },
      {
        "code": 129,
        "engraveName": "강화 무기",
        "className": "데빌헌터",
        "isPenalty": false
      },
    ]
  );
  findOne = jest.fn().mockResolvedValue(
    {
      "code": 129,
      "engraveName": "강화 무기",
      "className": "데빌헌터",
      "isPenalty": false
    }
  );
  create = jest.fn().mockResolvedValue(
    {
      "code": 129,
      "engraveName": "강화 무기",
      "className": "데빌헌터",
      "isPenalty": false
    }
  );
  replaceOne = jest.fn();
}

describe('EngraveService', () => {
  let engraveService: EngraveService;
  let engraveModel: Model<Engrave>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EngraveService,
        {
          provide: getModelToken(Engrave.name),
          useClass: MockEngraveModel,
        },
      ],
    }).compile();

    engraveService = module.get<EngraveService>(EngraveService);
    engraveModel = module.get<Model<Engrave>>(getModelToken(Engrave.name));
  });

  describe('findEngraves', () => {
    it('should return engraves', async () => {
      const result = await engraveService.findEngraves();
      expect(result).toStrictEqual(
        [
          {
            "code": 118,
            "engraveName": "원한",
            "className": "",
            "isPenalty": false
          },
          {
            "code": 123,
            "engraveName": "굳은 의지",
            "className": "",
            "isPenalty": false
          },
          {
            "code": 237,
            "engraveName": "실드 관통",
            "className": "",
            "isPenalty": false
          },
          {
            "code": 125,
            "engraveName": "광기",
            "className": "버서커",
            "isPenalty": false
          },
          {
            "code": 127,
            "engraveName": "오의 강화",
            "className": "배틀마스터",
            "isPenalty": false
          },
          {
            "code": 129,
            "engraveName": "강화 무기",
            "className": "데빌헌터",
            "isPenalty": false
          },
        ]
      );
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findClassEngraves', () => {
    it('should return engraves', async () => {
      const result = await engraveService.findClassEngraves('버서커');
      expect(result).toStrictEqual(
        [
          {
            "code": 125,
            "engraveName": "광기",
            "className": "버서커",
            "isPenalty": false
          },
        ]
      );
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findClassEngraveNames', () => {
    it('should return [string]', async () => {
      const result = await engraveService.findClassEngraveNames('버서커');
      expect(result).toStrictEqual(
        [
          '광기'
        ]
      );
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findClassEngraveCodes', () => {
    it('should return array of engraveCodes', async () => {
      const result = await engraveService.findClassEngraveCodes('버서커');
      expect(result).toStrictEqual(
        [
          125
        ]
      );
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createEngrave', () => {
    it('should return engrave', async () => {
      const result = await engraveService.createEngrave(
        {
          code: 1,
          engraveName: 'name',
          className: 'name',
          isPenalty: false,
        }
      );
      expect(result).toStrictEqual(
        {
          "code": 129,
          "engraveName": "강화 무기",
          "className": "데빌헌터",
          "isPenalty": false
        }
      );
      expect(jest.spyOn(engraveModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('replaceEngrave', () => {
    it('should return null', async () => {
      jest.spyOn(engraveModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await engraveService.replaceEngrave(
        {
          "code": 1,
          "engraveName": "name",
          "className": "class",
          "isPenalty": false
        }
      );
      expect(result).toBe(null);
      expect(jest.spyOn(engraveModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(engraveModel, 'findOne')).toBeCalledTimes(0);
    });

    it('should return engrave', async () => {
      jest.spyOn(engraveModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await engraveService.replaceEngrave(
        {
          "code": 1,
          "engraveName": "name",
          "className": "class",
          "isPenalty": false
        }
      );
      expect(result).toStrictEqual(
        {
          "code": 129,
          "engraveName": "강화 무기",
          "className": "데빌헌터",
          "isPenalty": false
        }
      );
      expect(jest.spyOn(engraveModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(engraveModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
