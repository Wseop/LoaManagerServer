import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ArmoryEngrave } from '../schemas/armory-setting.schema';
import { Type } from 'class-transformer';

export class CreateArmorySettingDto {
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

  @ApiProperty({ type: [ArmoryEngrave] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ArmoryEngrave)
  engraves: ArmoryEngrave[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemSet: string;

  @ApiProperty()
  @IsString()
  elixir: string;
}
