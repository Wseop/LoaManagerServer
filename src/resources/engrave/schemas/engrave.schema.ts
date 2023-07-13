import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Engrave {
  @Prop()
  code: number;

  @Prop()
  engraveName: string;

  @Prop()
  className: string;

  @Prop()
  isPenalty: boolean;
}

export const EngraveSchema = SchemaFactory.createForClass(Engrave);
