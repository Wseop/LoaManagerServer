import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

const mockUser: User = {
  userId: 'userId',
  password: 'password',
};

class MockUserService {
  findUser = jest.fn((userId) => {
    if (userId === 'userId') {
      return mockUser;
    } else {
      return undefined;
    }
  });
  createUser = jest.fn((user) => user);
  getAccessToken = jest.fn().mockReturnValue('jwt');
}

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser()', () => {
    it('should return an user', async () => {
      const expected = {
        userId: 'newUser',
        password: expect.anything(),
      };
      const result = await userController.createUser({
        userId: 'newUser',
        password: 'pw',
      });

      expect(result).toStrictEqual(expected);
      expect(jest.spyOn(userService, 'findUser')).toBeCalledTimes(1);
      expect(jest.spyOn(userService, 'createUser')).toBeCalledTimes(1);
    });
    it('should throw ConflictException', async () => {
      try {
        await userController.createUser({
          userId: 'userId',
          password: expect.anything(),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      } finally {
        expect(jest.spyOn(userService, 'findUser')).toBeCalledTimes(1);
        expect(jest.spyOn(userService, 'createUser')).toBeCalledTimes(0);
      }
    });
  });

  describe('signin()', () => {
    it('should return jwt', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      const result = await userController.signin(mockUser);

      expect(result).toBe('jwt');
      expect(jest.spyOn(userService, 'findUser')).toBeCalledTimes(1);
      expect(jest.spyOn(userService, 'getAccessToken')).toBeCalledTimes(1);
    });
    it('should throw UnprocessableEntityException 1', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      try {
        await userController.signin({ userId: 'invalid', password: 'pw' });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      } finally {
        expect(jest.spyOn(userService, 'findUser')).toBeCalledTimes(1);
        expect(jest.spyOn(userService, 'getAccessToken')).toBeCalledTimes(0);
      }
    });
    it('should throw UnprocessableEntityException 2', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      try {
        await userController.signin(mockUser);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      } finally {
        expect(jest.spyOn(userService, 'findUser')).toBeCalledTimes(1);
        expect(jest.spyOn(userService, 'getAccessToken')).toBeCalledTimes(0);
      }
    });
  });
});
