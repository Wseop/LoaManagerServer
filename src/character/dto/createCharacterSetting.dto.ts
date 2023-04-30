import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterSettingDto {
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsNumber()
  itemLevel: number;

  @IsNotEmpty()
  @IsString()
  ability: string;

  @IsOptional()
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
