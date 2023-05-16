import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class StatsSkillElement {
  @ApiProperty()
  skillName: string;

  @ApiProperty()
  tripodNames: string[];

  @ApiProperty()
  runeName: string;
}

@Schema()
export class StatsSkill {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngraves: string[];

  @Prop()
  skills: StatsSkillElement[];
}

export const StatsSkillSchema = SchemaFactory.createForClass(StatsSkill);
