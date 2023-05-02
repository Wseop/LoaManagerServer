import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signinUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findUser(createUserDto.userId);

    if (user) throw new ConflictException('이미 사용중인 ID입니다.');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const user = await this.userService.findUser(signinUserDto.userId);

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 ID입니다.');

    const isAuth = await bcrypt.compare(signinUserDto.password, user.password);

    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    return this.userService.getAccessToken(signinUserDto);
  }
}
