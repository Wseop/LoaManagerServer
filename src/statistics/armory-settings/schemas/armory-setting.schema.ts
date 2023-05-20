import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArmoryEngrave {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  level: number;
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
  itemSet: string;

  @Prop()
  elixir: string;
}

export const ArmorySettingSchema = SchemaFactory.createForClass(ArmorySetting);
