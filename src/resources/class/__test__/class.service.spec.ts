import { Model } from 'mongoose';
import { ClassService } from '../class.service';
import { Class } from '../schemas/class.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockClass: Class = {
  parent: 'string',
  child: ['string'],
};

class MockClassModel {
  find = jest.fn().mockResolvedValue(mockClass);
  findOne = jest.fn().mockResolvedValue(mockClass);
  create = jest.fn().mockResolvedValue(mockClass);
  replaceOne = jest.fn();
}

describe('ClassService', () => {
  let classService: ClassService;
  let classModel: Model<Class>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        {
          provide: getModelToken(Class.name),
          useClass: MockClassModel,
        },
      ],
    }).compile();

    classService = module.get<ClassService>(ClassService);
    classModel = module.get<Model<Class>>(getModelToken(Class.name));
  });

  describe('findClasses', () => {
    it('should return class', async () => {
      const result = await classService.findClasses();
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createClass', () => {
    it('should return class', async () => {
      const result = await classService.createClass(mockClass);
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('replaceClass', () => {
    it('should return null', async () => {
      jest.spyOn(classModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await classService.replaceClass(mockClass);
      expect(result).toBe(null);
      expect(jest.spyOn(classModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(classModel, 'findOne')).toBeCalledTimes(0);
    });

    it('should return class', async () => {
      jest.spyOn(classModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await classService.replaceClass(mockClass);
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(classModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
