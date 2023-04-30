import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RewardGuardian {
  @Prop()
  level: string;

  @Prop()
  count: number;

  @Prop()
  destruction: number;

  @Prop()
  protection: number;

  @Prop()
  leapStone: number;
}

export const RewardGuardianSchema =
  SchemaFactory.createForClass(RewardGuardian);
