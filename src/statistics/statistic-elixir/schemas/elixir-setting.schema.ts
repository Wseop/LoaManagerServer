import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ElixirSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  elixir: string;
}

export const ElixirSettingSchema = SchemaFactory.createForClass(ElixirSetting);
