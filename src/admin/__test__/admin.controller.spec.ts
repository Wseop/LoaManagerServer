import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import { Admin } from '../schemas/admin.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MockAdminModel } from './mocks/admin.mock';

describe('AdminController', () => {
  let adminController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getModelToken(Admin.name),
          useClass: MockAdminModel,
        },
      ],
    }).compile();

    adminController = app.get<AdminController>(AdminController);
  });

  describe('findAll', () => {
    it('findAll', async () => {
      const expected = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
        { key: 'key3', value: 'value3' },
      ];
      const result = await adminController.findAll();

      expect(result).toStrictEqual(expected);
    });
  });

  describe('find', () => {
    it('findByKey', async () => {
      const expected = { key: 'key2', value: 'value2' };
      const result = await adminController.find('key2');

      expect(result).toStrictEqual(expected);
    });
  });
});
