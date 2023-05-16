import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class RewardElementItem {
  @ApiProperty()
  item: string;

  @ApiProperty()
  count: number;
}

export class RewardElement {
  @ApiProperty()
  level: string;

  @ApiProperty()
  cost: number;

  @ApiProperty({ type: [RewardElementItem] })
  items: RewardElementItem[];
}

@Schema()
export class Reward {
  @Prop()
  content: string;

  @Prop()
  rewards: RewardElement[];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
