import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Engrave {
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
export class StatsSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  itemLevel: number;

  @Prop()
  ability: string;

  @Prop()
  elixir: string;

  @Prop()
  engraves: Engrave[];

  @Prop()
  itemSet: string;
}

export const StatsSettingSchema = SchemaFactory.createForClass(StatsSetting);
