import { Model } from 'mongoose';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

const mockUser: User = {
  userId: 'userId',
  password: 'password',
};

class MockUserModel {
  findOne = jest.fn().mockReturnValue(mockUser);
  create = jest.fn().mockReturnValue(mockUser);
}

class MockJwtService {
  sign = jest.fn().mockReturnValue('jwt');
}

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;
  let jwtService: JwtService;

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
          useClass: MockJwtService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('findUser()', () => {
    it('should return an user', async () => {
      const result = await userService.findUser(mockUser.userId);

      expect(result).toStrictEqual(mockUser);
      expect(jest.spyOn(userModel, 'findOne')).toBeCalledTimes(1);
    });
  });

  describe('createUser()', () => {
    it('should return an user', async () => {
      const result = await userService.createUser(mockUser);

      expect(result).toStrictEqual(mockUser);
      expect(jest.spyOn(userModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('getAccessToken()', () => {
    it('should return jwt', () => {
      const result = userService.getAccessToken(mockUser);

      expect(result).toBe('jwt');
      expect(jest.spyOn(jwtService, 'sign')).toBeCalledTimes(1);
    });
  });
});
