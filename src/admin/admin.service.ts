import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,

    private readonly jwtService: JwtService,
  ) {}

  async findAdmin(adminId: string) {
    return await this.adminModel.findOne({ adminId });
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    return await this.adminModel.create(createAdminDto);
  }

  getAccessToken(admin) {
    return this.jwtService.sign(
      { adminId: admin.adminId, sub: admin._id },
      { secret: process.env.ACCESS_SECRET, expiresIn: '1h' },
    );
  }
}
