import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class StatsSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  itemLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ability: string;

  @ApiProperty()
  @IsString()
  elixir: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  engrave: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  engraveLevel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemSet: string;
}
