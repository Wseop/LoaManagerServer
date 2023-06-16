import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CharacterEngrave } from 'src/lostark/characters/interfaces/character-engrave.interface';

@Schema()
export class EngraveSetting {
  @Prop()
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  className: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  classEngrave: string;

  @Prop()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CharacterEngrave)
  engraves: CharacterEngrave[];
}

export const EngraveSettingSchema =
  SchemaFactory.createForClass(EngraveSetting);
