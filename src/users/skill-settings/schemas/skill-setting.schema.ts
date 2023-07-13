import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SkillUsage {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  skillLevel: number;

  @ApiProperty()
  @IsString({ each: true })
  tripodNames: string[];

  @ApiProperty()
  @IsString()
  runeName: string;
}

@Schema({ versionKey: false })
export class SkillSetting {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  skillUsages: SkillUsage[];
}

export const SkillSettingSchema = SchemaFactory.createForClass(SkillSetting);
