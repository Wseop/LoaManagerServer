import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Class {
  @Prop()
  parent: string;

  @Prop()
  child: string[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
