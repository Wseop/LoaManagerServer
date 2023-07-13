import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { SigninAdminDto } from './dto/signin-admin.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('[Admin]')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/signup')
  @ApiConflictResponse({ description: 'adminId already in use' })
  @ApiCreatedResponse({ description: 'success signup' })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findAdmin(createAdminDto.adminId);

    if (admin) throw new ConflictException('이미 사용중인 ID입니다.');

    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 10);

    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('/signin')
  @ApiUnprocessableEntityResponse({
    description: 'non-existent adminId or password mismatch',
  })
  @ApiCreatedResponse({ description: 'success signin' })
  async signin(@Body() signinAdminDto: SigninAdminDto): Promise<string> {
    const admin = await this.adminService.findAdmin(signinAdminDto.adminId);

    if (!admin)
      throw new UnprocessableEntityException('존재하지 않는 ID입니다.');

    const isAuth = await bcrypt.compare(
      signinAdminDto.password,
      admin.password,
    );

    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    return this.adminService.getAccessToken(signinAdminDto);
  }
}
