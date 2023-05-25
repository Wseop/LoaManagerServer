import { Model } from 'mongoose';
import { InfoService } from '../info.service';
import { Info } from '../schemas/info.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockInfo: Info = {
  key: 'key',
  value: 'value',
};

class MockInfoModel {
  find = jest.fn().mockReturnValue([mockInfo]);
  findOne = jest.fn().mockReturnValue(mockInfo);
}

describe('InfoService', () => {
  let infoService: InfoService;
  let infoModel: Model<Info>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfoService,
        {
          provide: getModelToken(Info.name),
          useClass: MockInfoModel,
        },
      ],
    }).compile();

    infoService = module.get<InfoService>(InfoService);
    infoModel = module.get<Model<Info>>(getModelToken(Info.name));
  });

  describe('findAll()', () => {
    it('should return an array of infos', async () => {
      const result = await infoService.findAll();

      expect(result).toStrictEqual([mockInfo]);
      expect(jest.spyOn(infoModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('should return an info', async () => {
      const result = await infoService.find('key');

      expect(result).toStrictEqual(mockInfo);
      expect(jest.spyOn(infoModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
