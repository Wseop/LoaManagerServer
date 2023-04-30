import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Admin {
  @Prop()
  key: string;

  @Prop()
  value: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
