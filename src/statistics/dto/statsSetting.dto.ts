import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class StatsSettingDto {
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  itemLevel: number;

  @IsNotEmpty()
  @IsString()
  ability: string;

  @IsString()
  elixir: string;

  @IsNotEmpty()
  @IsString()
  engrave: string;

  @IsNotEmpty()
  @IsString()
  engraveLevel: string;

  @IsNotEmpty()
  @IsString()
  itemSet: string;
}
