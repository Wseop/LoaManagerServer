import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EngraveDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  engraveName: string;

  @ApiProperty()
  @IsString()
  className: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPenalty: boolean;
}
