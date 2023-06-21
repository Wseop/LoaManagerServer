import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AbilitySetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  ability: string;
}

export const AbilitySettingSchema =
  SchemaFactory.createForClass(AbilitySetting);
