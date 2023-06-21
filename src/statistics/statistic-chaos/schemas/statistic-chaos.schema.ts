import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StatisticChaos {
  @Prop()
  level: string;

  @Prop()
  count: number;

  @Prop()
  silling: number;

  @Prop()
  shard: number;

  @Prop()
  destructionStone: number;

  @Prop()
  protectionStone: number;

  @Prop()
  leapStone: number;

  @Prop()
  gem: number;
}

export const StatisticChaosSchema =
  SchemaFactory.createForClass(StatisticChaos);
