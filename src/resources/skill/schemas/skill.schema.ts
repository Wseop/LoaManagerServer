import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Tripod {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tripodName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tripodCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  iconIndex: number;
}

export class SkillElement {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  skillCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  iconPath: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isCounter: boolean;

  @ApiProperty({ type: [Tripod] })
  @ValidateNested({ each: true })
  @Type(() => Tripod)
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
