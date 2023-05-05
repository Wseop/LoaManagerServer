import { Model } from 'mongoose';
import { AdminService } from '../admin.service';
import { Admin } from '../schemas/admin.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class MockAdminModel {
  datas = [
    {
      key: 'key1',
      value: 'value1',
    },
    {
      key: 'key2',
      value: 'value2',
    },
    {
      key: 'key3',
      value: 'value3',
    },
  ];

  find = jest.fn().mockReturnValue(this.datas);
  findOne = jest.fn(({ key }) => {
    return this.datas.find((data) => data.key === key);
  });
}

describe('AdminService', () => {
  let adminService: AdminService;
  let adminModel: Model<Admin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Admin.name),
          useClass: MockAdminModel,
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminModel = module.get<Model<Admin>>(getModelToken(Admin.name));
  });

  describe('findAll()', () => {
    it('return an array of Adminds', async () => {
      const result = await adminService.findAll();
      const expected = [
        {
          key: 'key1',
          value: 'value1',
        },
        {
          key: 'key2',
          value: 'value2',
        },
        {
          key: 'key3',
          value: 'value3',
        },
      ];
      const spyFindAll = jest.spyOn(adminModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFindAll).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('find and return an Admin by key', async () => {
      const result = await adminService.find('key3');
      const expected = { key: 'key3', value: 'value3' };
      const spyFind = jest.spyOn(adminModel, 'findOne');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });
  });
});
