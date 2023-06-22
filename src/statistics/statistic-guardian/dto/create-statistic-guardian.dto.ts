import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateStatisticGuardianDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  destructionStone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protectionStone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  leapStone: number;
}
