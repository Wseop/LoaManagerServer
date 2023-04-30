import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISkill } from '../interfaces/skill.interface';

@Schema()
export class CharacterSkill {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string[];

  @Prop()
  skill: ISkill[];
}

export const CharacterSkillSchema =
  SchemaFactory.createForClass(CharacterSkill);
