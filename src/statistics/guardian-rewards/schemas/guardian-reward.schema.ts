import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GuardianReward {
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

export const GuardianRewardSchema =
  SchemaFactory.createForClass(GuardianReward);
