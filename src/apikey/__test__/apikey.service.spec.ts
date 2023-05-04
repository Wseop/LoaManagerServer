import { Test } from '@nestjs/testing';
import { ApiKeyService } from '../apikey.service';
import { MockApiKeyModel } from './mocks/apikey.mock';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKey } from '../schemas/apikey.schema';

describe('ApiKeyService', () => {
  let apiKeyService: ApiKeyService;
  let apiKeyModel: MockApiKeyModel;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        ApiKeyService,
        {
          provide: getModelToken(ApiKey.name),
          useClass: MockApiKeyModel,
        },
      ],
    }).compile();

    apiKeyService = app.get<ApiKeyService>(ApiKeyService);
    apiKeyModel = app.get<MockApiKeyModel>(getModelToken(ApiKey.name));
  });

  describe('findAll', () => {
    it('test findAll', async () => {
      const expected = [
        { apiKey: 'key1' },
        { apiKey: 'key2' },
        { apiKey: 'key3' },
      ];

      const findSpy = jest.spyOn(apiKeyModel, 'find');
      const result = await apiKeyService.findAll();

      expect(result).toStrictEqual(expected);
      expect(findSpy).toBeCalledTimes(1);
    });
  });
});
