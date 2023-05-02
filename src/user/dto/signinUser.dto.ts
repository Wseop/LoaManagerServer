import { IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
