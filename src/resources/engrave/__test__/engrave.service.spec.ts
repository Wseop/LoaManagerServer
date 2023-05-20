import { Model } from 'mongoose';
import { EngraveService } from '../engrave.service';
import { Engrave } from '../schemas/engrave.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockEngrave: Engrave = {
  code: 0,
  engraveName: 'string',
  className: 'string',
  isPenalty: true,
};

class MockEngraveModel {
  find = jest.fn().mockResolvedValue([mockEngrave]);
  findOne = jest.fn().mockResolvedValue(mockEngrave);
  create = jest.fn().mockResolvedValue(mockEngrave);
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
      expect(result).toStrictEqual([mockEngrave]);
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findEngravesByClassName', () => {
    it('should return engraves', async () => {
      const result = await engraveService.findEngravesByClassName('className');
      expect(result).toStrictEqual([mockEngrave]);
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createEngrave', () => {
    it('should return engrave', async () => {
      const result = await engraveService.createEngrave(mockEngrave);
      expect(result).toStrictEqual(mockEngrave);
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

      const result = await engraveService.replaceEngrave(mockEngrave);
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

      const result = await engraveService.replaceEngrave(mockEngrave);
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(engraveModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
