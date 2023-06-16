import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SetSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  set: string;
}

export const SetSettingSchema = SchemaFactory.createForClass(SetSetting);
