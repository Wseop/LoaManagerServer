import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,
  ) {}

  async findUser(userId: string) {
    return await this.userModel.findOne({ userId });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  getAccessToken(user) {
    return this.jwtService.sign(
      { userId: user.userId, sub: user._id },
      { secret: process.env.ACCESS_SECRET, expiresIn: '1h' },
    );
  }
}
