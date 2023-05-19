import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Engrave } from '../schemas/stats-setting.schema';
import { Type } from 'class-transformer';

export class CreateStatsSettingDto {
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

  @ApiProperty({ type: [Engrave] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Engrave)
  engraves: Engrave[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemSet: string;
}
