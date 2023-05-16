import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class StatsGuardianDto {
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
  destruction: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protection: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  leapStone: number;
}
