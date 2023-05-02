import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
