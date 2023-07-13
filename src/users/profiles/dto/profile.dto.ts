import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CharacterEngrave } from 'src/lostark/characters/interfaces/character-engrave.interface';

export class ProfileDto {
  @ApiProperty()
  @IsOptional()
  characterName?: string;

  @ApiProperty()
  @IsOptional()
  className?: string;

  @ApiProperty()
  @IsOptional()
  classEngrave?: string;

  @ApiProperty()
  @IsOptional()
  itemLevel?: number;

  @ApiProperty()
  @IsOptional()
  ability?: string;

  @ApiProperty()
  @IsOptional()
  set?: string;

  @ApiProperty({ type: [CharacterEngrave] })
  @IsOptional()
  engraves?: CharacterEngrave[];

  @ApiProperty()
  @IsOptional()
  elixir?: string;
}
