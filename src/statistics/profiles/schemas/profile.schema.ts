import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Schema()
export class Profile {
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
  @IsNumber()
  itemLevel: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
