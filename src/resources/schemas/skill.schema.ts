import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop()
  className: string;

  @Prop()
  skills: [
    {
      skillName: string;
      skillCode: number;
      iconPath: string;
      isCounter: boolean;
      tripods: [
        {
          tripodName: string;
          tripodCode: number;
          iconIndex: number;
        },
      ];
    },
  ];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
