import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
