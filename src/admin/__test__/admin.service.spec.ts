import { Model } from 'mongoose';
import { AdminService } from '../admin.service';
import { Admin } from '../schemas/admin.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockAdmin: Admin = {
  key: 'key',
  value: 'value',
};

class MockAdminModel {
  find = jest.fn().mockReturnValue([mockAdmin]);
  findOne = jest.fn().mockReturnValue(mockAdmin);
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
    it('should return an array of admins', async () => {
      const result = await adminService.findAll();

      expect(result).toStrictEqual([mockAdmin]);
      expect(jest.spyOn(adminModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('should return an admin', async () => {
      const result = await adminService.find('key');

      expect(result).toStrictEqual(mockAdmin);
      expect(jest.spyOn(adminModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
