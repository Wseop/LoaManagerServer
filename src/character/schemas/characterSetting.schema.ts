import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CharacterSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  itemLevel: number;

  @Prop()
  ability: string;

  @Prop()
  elixir?: string;

  @Prop()
  engrave: string;

  @Prop()
  engraveLevel: string;

  @Prop()
  itemSet: string;
}

export const CharacterSettingSchema =
  SchemaFactory.createForClass(CharacterSetting);
