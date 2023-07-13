import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ApiKey {
  @Prop()
  index: number;

  @Prop()
  apiKey: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
