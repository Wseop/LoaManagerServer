import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class ElixirSetting {
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
  @IsNotEmpty()
  @IsString()
  elixir: string;
}

export const ElixirSettingSchema = SchemaFactory.createForClass(ElixirSetting);
