import { Model } from 'mongoose';
import { ApiKeyService } from '../apikey.service';
import { ApiKey } from '../schemas/apikey.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockApikey: ApiKey = {
  apiKey: 'apiKey',
};

class MockApiKeyModel {
  find = jest.fn().mockReturnValue([mockApikey]);
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
    it('should return an array of apiKeys', async () => {
      const result = await apiKeyService.findAll();

      expect(result).toStrictEqual([mockApikey]);
      expect(jest.spyOn(apiKeyModel, 'find')).toBeCalledTimes(1);
    });
  });
});
