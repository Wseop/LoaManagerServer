import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterEngrave } from 'src/lostark/characters/interfaces/character-engrave.interface';

@Schema({ versionKey: false })
export class Profile {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  itemLevel: number;

  @Prop()
  ability: string;

  @Prop()
  set: string;

  @Prop()
  engraves: CharacterEngrave[];

  @Prop()
  elixir: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
