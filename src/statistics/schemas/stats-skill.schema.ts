import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StatsSkillElement {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  tripodNames: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
