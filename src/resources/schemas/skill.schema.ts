import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Tripod {
  @ApiProperty()
  tripodName: string;

  @ApiProperty()
  tripodCode: number;

  @ApiProperty()
  iconIndex: number;
}

export class SkillElement {
  @ApiProperty()
  skillName: string;

  @ApiProperty()
  skillCode: number;

  @ApiProperty()
  iconPath: string;

  @ApiProperty({ default: false })
  isCounter: boolean;

  @ApiProperty({ type: [Tripod] })
  tripods: Tripod[];
}

@Schema()
export class Skill {
  @Prop()
  className: string;

  @Prop()
  skills: SkillElement[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
