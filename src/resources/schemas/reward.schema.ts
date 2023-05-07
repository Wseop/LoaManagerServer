import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reward {
  @Prop()
  content: string;

  @Prop()
  rewards: [
    {
      level: string;
      cost?: number;
      items: [{ item: string; count: number }];
    },
  ];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
