import { Model } from 'mongoose';
import { ApiKeyService } from '../apikey.service';
import { ApiKey } from '../schemas/apikey.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class MockApiKeyModel {
  datas = [
    {
      apiKey: 'apiKey1',
    },
    {
      apiKey: 'apiKey2',
    },
    {
      apiKey: 'apiKey3',
    },
  ];

  find = jest.fn().mockReturnValue(this.datas);
}

describe('ApiKeyService', () => {
  let apiKeyService: ApiKeyService;
  let apiKeyModel: Model<ApiKey>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyService,
        {
          provide: getModelToken(ApiKey.name),
          useClass: MockApiKeyModel,
        },
      ],
    }).compile();

    apiKeyService = module.get<ApiKeyService>(ApiKeyService);
    apiKeyModel = module.get<Model<ApiKey>>(getModelToken(ApiKey.name));
  });

  describe('findAll()', () => {
    it('return an array of ApiKeys', async () => {
      const result = await apiKeyService.findAll();
      const expected = [
        {
          apiKey: 'apiKey1',
        },
        {
          apiKey: 'apiKey2',
        },
        {
          apiKey: 'apiKey3',
        },
      ];
      const spyFind = jest.spyOn(apiKeyModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });
  });
});
