import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class AbilitySetting {
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
  ability: string;
}

export const AbilitySettingSchema =
  SchemaFactory.createForClass(AbilitySetting);
