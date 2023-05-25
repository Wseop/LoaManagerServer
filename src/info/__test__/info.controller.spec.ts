import { Test, TestingModule } from '@nestjs/testing';
import { InfoController } from '../info.controller';
import { InfoService } from '../info.service';
import { Info } from '../schemas/info.schema';

const mockInfo: Info = {
  key: 'key',
  value: 'value',
};

class MockInfoService {
  findAll = jest.fn().mockReturnValue([mockInfo]);
  find = jest.fn().mockReturnValue(mockInfo);
}

describe('InfoController', () => {
  let infoController: InfoController;
  let infoService: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [
        {
          provide: InfoService,
          useClass: MockInfoService,
        },
      ],
    }).compile();

    infoController = module.get<InfoController>(InfoController);
    infoService = module.get<InfoService>(InfoService);
  });

  describe('findAll()', () => {
    it('should return an array of infos', () => {
      const result = infoController.findAll();

      expect(result).toStrictEqual([mockInfo]);
      expect(jest.spyOn(infoService, 'findAll')).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('should return an info', () => {
      const result = infoController.find('key');

      expect(result).toStrictEqual(mockInfo);
      expect(jest.spyOn(infoService, 'find')).toBeCalledTimes(1);
    });
  });
});
