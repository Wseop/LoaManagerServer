import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class EngraveSetting {
  @Prop()
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  className: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  classEngrave: string;

  @Prop()
  @IsNotEmpty()
  engraves: {
    engraveName: string;
    engraveLevel: number;
  }[];
}

export const EngraveSettingSchema =
  SchemaFactory.createForClass(EngraveSetting);
