import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillElement } from '../interfaces/skill.interface';

@Schema()
export class Skill {
  @Prop()
  className: string;

  @Prop()
  skills: SkillElement[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
