import { Model } from 'mongoose';
import { ApiKeysService } from '../api-keys.service';
import { ApiKey } from '../schemas/api-key.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class MockApiKeyModel {
  findOne = jest.fn().mockResolvedValue({
    index: 0,
    apiKey: 'key',
  });

  create = jest.fn((newApiKey) => newApiKey);

  countDocuments = jest.fn().mockResolvedValue(0);
  estimatedDocumentCount = jest.fn().mockResolvedValue(5);
}

describe('ApiKeysService', () => {
  let apiKeysService: ApiKeysService;
  let apiKeyModel: Model<ApiKey>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeysService,
        {
          provide: getModelToken(ApiKey.name),
          useClass: MockApiKeyModel,
        },
      ],
    }).compile();

    apiKeysService = module.get<ApiKeysService>(ApiKeysService);
    apiKeyModel = module.get<Model<ApiKey>>(getModelToken(ApiKey.name));
  });

  describe('createApiKey', () => {
    it('should return ApiKey', async () => {
      const result = await apiKeysService.createApiKey({ apiKey: 'key' });
      expect(result).toStrictEqual({
        index: 0,
        apiKey: 'key',
      });
      expect(jest.spyOn(apiKeyModel, 'countDocuments')).toBeCalledTimes(1);
      expect(jest.spyOn(apiKeyModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('getNextKeyIndex', () => {
    it('should return [0, 1, 2, 3, 4]', async () => {
      const result = [];

      for (let i = 0; i < 5; i++) {
        result.push(await apiKeysService.getNextKeyIndex());
      }

      expect(result).toStrictEqual([0, 1, 2, 3, 4]);
      expect(jest.spyOn(apiKeyModel, 'estimatedDocumentCount')).toBeCalledTimes(
        5,
      );
    });
  });

  describe('getApiKey', () => {
    it('should return ApiKey', async () => {
      const result = await apiKeysService.getApiKey();
      expect(result).toBe('key');
      expect(jest.spyOn(apiKeyModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
