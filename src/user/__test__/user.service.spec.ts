import { Model } from 'mongoose';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

class MockUserModel {
  datas = [
    {
      userId: 'userId',
      password: 'password',
    },
  ];

  findOne = jest.fn((filter) => {
    return this.datas.find((data) => data.userId === filter.userId);
  });

  create = jest.fn((createUserDto: CreateUserDto) => {
    return this.datas[this.datas.push(createUserDto) - 1];
  });
}

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useClass: MockUserModel,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findUser()', () => {
    it('find an user by userId', async () => {
      const userId = 'userId';
      const expected = {
        userId: 'userId',
        password: 'password',
      };
      const result = await userService.findUser(userId);
      const spyFindOne = jest.spyOn(userModel, 'findOne');

      expect(result).toStrictEqual(expected);
      expect(spyFindOne).toBeCalledTimes(1);
    });
  });

  describe('createUser()', () => {
    it('create new user', async () => {
      const createUserDto = {
        userId: 'newUser',
        password: '1234',
      };
      const result = await userService.createUser(createUserDto);
      const spyCreate = jest.spyOn(userModel, 'create');

      expect(result).toStrictEqual(createUserDto);
      expect(spyCreate).toBeCalledTimes(1);
    });
  });
});
