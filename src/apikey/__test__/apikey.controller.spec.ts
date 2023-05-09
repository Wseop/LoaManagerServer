import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyController } from '../apikey.controller';
import { ApiKeyService } from '../apikey.service';
import { ApiKey } from '../schemas/apikey.schema';

const mockApikey: ApiKey = {
  apiKey: 'apiKey',
};

class MockApiKeyService {
  findAll = jest.fn().mockReturnValue([mockApikey]);
}

describe('ApiKeyController', () => {
  let apiKeyController: ApiKeyController;
  let apiKeyService: ApiKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeyController],
      providers: [
        {
          provide: ApiKeyService,
          useClass: MockApiKeyService,
        },
      ],
    }).compile();

    apiKeyController = module.get<ApiKeyController>(ApiKeyController);
    apiKeyService = module.get<ApiKeyService>(ApiKeyService);
  });

  describe('findAll()', () => {
    it('should return an array of apiKeys', () => {
      const result = apiKeyController.findAll();

      expect(result).toStrictEqual([mockApikey]);
      expect(jest.spyOn(apiKeyService, 'findAll')).toBeCalledTimes(1);
    });
  });
});
