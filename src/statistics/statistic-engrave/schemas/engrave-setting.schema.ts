import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterEngrave } from '../../../lostark/characters/interfaces/character-engrave.interface';

@Schema()
export class EngraveSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  engraves: CharacterEngrave[];
}

export const EngraveSettingSchema =
  SchemaFactory.createForClass(EngraveSetting);
