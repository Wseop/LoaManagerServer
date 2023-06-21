import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StatisticGuardian {
  @Prop()
  level: string;

  @Prop()
  count: number;

  @Prop()
  destructionStone: number;

  @Prop()
  protectionStone: number;

  @Prop()
  leapStone: number;
}

export const StatisticGuardianSchema =
  SchemaFactory.createForClass(StatisticGuardian);
