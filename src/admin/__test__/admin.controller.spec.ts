import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';

class MockAdminService {
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

  findAll = jest.fn().mockReturnValue(this.datas);
  find = jest.fn((key) => {
    return this.datas.find((data) => data.key === key);
  });
}

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useClass: MockAdminService,
        },
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  describe('findAll()', () => {
    it('return an array of Admins', () => {
      const result = adminController.findAll();
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
      const spyFindAll = jest.spyOn(adminService, 'findAll');

      expect(result).toStrictEqual(expected);
      expect(spyFindAll).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('find and return an Admin by key', () => {
      const result = adminController.find('key2');
      const expected = { key: 'key2', value: 'value2' };
      const spyFind = jest.spyOn(adminService, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });
  });
});
