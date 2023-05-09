import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import { Admin } from '../schemas/admin.schema';

const mockAdmin: Admin = {
  key: 'key',
  value: 'value',
};

class MockAdminService {
  findAll = jest.fn().mockReturnValue([mockAdmin]);
  find = jest.fn().mockReturnValue(mockAdmin);
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
    it('should return an array of admins', () => {
      const result = adminController.findAll();

      expect(result).toStrictEqual([mockAdmin]);
      expect(jest.spyOn(adminService, 'findAll')).toBeCalledTimes(1);
    });
  });

  describe('find(key)', () => {
    it('should return an admin', () => {
      const result = adminController.find('key');

      expect(result).toStrictEqual(mockAdmin);
      expect(jest.spyOn(adminService, 'find')).toBeCalledTimes(1);
    });
  });
});
