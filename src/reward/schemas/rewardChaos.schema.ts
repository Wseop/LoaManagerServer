import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RewardChaos {
  @Prop()
  level: string;

  @Prop()
  count: number;

  @Prop()
  silling: number;

  @Prop()
  shard: number;

  @Prop()
  destruction: number;

  @Prop()
  protection: number;

  @Prop()
  leapStone: number;

  @Prop()
  gem: number;
}

export const RewardChaosSchema = SchemaFactory.createForClass(RewardChaos);
