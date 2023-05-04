import { Test } from '@nestjs/testing';
import { AdminService } from '../admin.service';
import { MockAdminModel } from './mocks/admin.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Admin } from '../schemas/admin.schema';

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository: MockAdminModel;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Admin.name),
          useClass: MockAdminModel,
        },
      ],
    }).compile();

    adminService = app.get<AdminService>(AdminService);
    adminRepository = app.get<MockAdminModel>(getModelToken(Admin.name));
  });

  describe('findAll', () => {
    it('findAll', async () => {
      const expected = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
        { key: 'key3', value: 'value3' },
      ];

      const findSpy = jest.spyOn(adminRepository, 'find');
      const result = await adminService.findAll();

      expect(findSpy).toBeCalledTimes(1);
      expect(result).toStrictEqual(expected);
    });
  });

  describe('find', () => {
    it('findByKey', async () => {
      const expected = { key: 'key1', value: 'value1' };

      const findOneSpy = jest.spyOn(adminRepository, 'findOne');
      const result = await adminService.find('key1');

      expect(result).toStrictEqual(expected);
      expect(findOneSpy).toBeCalledTimes(1);
    });
  });
});
