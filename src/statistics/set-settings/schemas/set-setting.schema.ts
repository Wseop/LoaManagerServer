import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class SetSetting {
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
  @IsString()
  set: string;
}

export const SetSettingSchema = SchemaFactory.createForClass(SetSetting);
