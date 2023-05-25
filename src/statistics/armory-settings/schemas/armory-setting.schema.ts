import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArmoryEngrave {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  engraveName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  engraveLevel: number;
}

@Schema()
export class ArmorySetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  itemLevel: number;

  @Prop()
  ability: string;

  @Prop()
  engraves: ArmoryEngrave[];

  @Prop()
  classEngraves: ArmoryEngrave[];

  @Prop()
  itemSet: string;

  @Prop()
  elixir: string;
}

export const ArmorySettingSchema = SchemaFactory.createForClass(ArmorySetting);
