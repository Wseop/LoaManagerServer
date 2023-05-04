import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyController } from '../apikey.controller';
import { ApiKeyService } from '../apikey.service';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKey } from '../schemas/apikey.schema';
import { MockApiKeyModel } from './mocks/apikey.mock';

describe('ApiKeyController', () => {
  let apiKeyController: ApiKeyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeyController],
      providers: [
        ApiKeyService,
        {
          provide: getModelToken(ApiKey.name),
          useClass: MockApiKeyModel,
        },
      ],
    }).compile();

    apiKeyController = app.get<ApiKeyController>(ApiKeyController);
  });

  describe('findAll', () => {
    it('test findAll', async () => {
      const expected = [
        { apiKey: 'key1' },
        { apiKey: 'key2' },
        { apiKey: 'key3' },
      ];
      const result = await apiKeyController.findAll();

      expect(result).toStrictEqual(expected);
    });
  });
});
