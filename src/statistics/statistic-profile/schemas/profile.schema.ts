import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  characterName: string;

  @Prop()
  className: string;

  @Prop()
  classEngrave: string;

  @Prop()
  itemLevel: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
