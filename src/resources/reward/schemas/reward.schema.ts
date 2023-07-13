import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardElement } from '../interfaces/reward.interface';

@Schema({ versionKey: false })
export class Reward {
  @Prop()
  content: string;

  @Prop()
  rewards: RewardElement[];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
