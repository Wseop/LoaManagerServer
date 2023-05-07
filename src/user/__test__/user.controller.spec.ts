import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { SigninUserDto } from '../dto/signinUser.dto';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';

class MockUserService {
  datas = [
    {
      userId: 'userId',
      password: '$2b$10$VgMJGhBKJ0wm3WhV0mjqDeCVQ0zk1WWjBSURNPnBMaKiJoYN43fNm',
    },
  ];

  findUser = jest.fn((userId) => {
    return this.datas.find((data) => data.userId === userId);
  });

  createUser = jest.fn((createUserDto: CreateUserDto) => {
    return this.datas[this.datas.push(createUserDto) - 1];
  });

  getAccessToken = jest.fn((signinUserDto: SigninUserDto) => {
    return 'jwt';
  });
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
    it('create new user', async () => {
      const createUserDto = {
        userId: 'newUser',
        password: '1234',
      };
      const expected = {
        userId: 'newUser',
        password: expect.anything(),
      };
      const result = await userController.createUser(createUserDto);
      const spyFindUser = jest.spyOn(userService, 'findUser');
      const spyCreateUser = jest.spyOn(userService, 'createUser');

      expect(result).toStrictEqual(expected);
      expect(spyFindUser).toBeCalledTimes(1);
      expect(spyCreateUser).toBeCalledTimes(1);
    });

    it('throw ConflictException', async () => {
      const createUserDto = {
        userId: 'userId',
        password: '1234',
      };
      const spyFindUser = jest.spyOn(userService, 'findUser');
      const spyCreateUser = jest.spyOn(userService, 'createUser');

      try {
        await userController.createUser(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      } finally {
        expect(spyFindUser).toBeCalledTimes(1);
        expect(spyCreateUser).toBeCalledTimes(0);
      }
    });
  });

  describe('signin()', () => {
    it('signin', async () => {
      const signinUserDto = {
        userId: 'userId',
        password: '1234',
      };
      const expected = 'jwt';
      const result = await userController.signin(signinUserDto);
      const spyFindUser = jest.spyOn(userService, 'findUser');
      const spyGetAccessToken = jest.spyOn(userService, 'getAccessToken');

      expect(result).toBe(expected);
      expect(spyFindUser).toBeCalledTimes(1);
      expect(spyGetAccessToken).toBeCalledTimes(1);
    });

    it('invalid userId', async () => {
      const signinUserDto = {
        userId: 'invalid',
        password: '1234',
      };
      const spyFindUser = jest.spyOn(userService, 'findUser');
      const spyGetAccessToken = jest.spyOn(userService, 'getAccessToken');

      try {
        await userController.signin(signinUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      } finally {
        expect(spyFindUser).toBeCalledTimes(1);
        expect(spyGetAccessToken).toBeCalledTimes(0);
      }
    });

    it('invalid password', async () => {
      const signinUserDto = {
        userId: 'userId',
        password: '4321',
      };
      const spyFindUser = jest.spyOn(userService, 'findUser');
      const spyGetAccessToken = jest.spyOn(userService, 'getAccessToken');

      try {
        await userController.signin(signinUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      } finally {
        expect(spyFindUser).toBeCalledTimes(1);
        expect(spyGetAccessToken).toBeCalledTimes(0);
      }
    });
  });
});
