import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StatsSkill {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngraves: string[];

  @Prop()
  skills: [
    {
      skillName: string;
      tripodNames: string[];
      runeName: string;
    },
  ];
}

export const StatsSkillSchema = SchemaFactory.createForClass(StatsSkill);
