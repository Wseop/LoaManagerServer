import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyController } from '../apikey.controller';
import { ApiKeyService } from '../apikey.service';

class MockApiKeyService {
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

  findAll = jest.fn().mockReturnValue(this.datas);
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
    it('return an array of ApiKeys', () => {
      const result = apiKeyController.findAll();
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
      const spyFindAll = jest.spyOn(apiKeyService, 'findAll');

      expect(result).toStrictEqual(expected);
      expect(spyFindAll).toBeCalledTimes(1);
    });
  });
});
