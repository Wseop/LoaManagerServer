import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Info {
  @Prop()
  key: string;

  @Prop()
  value: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
