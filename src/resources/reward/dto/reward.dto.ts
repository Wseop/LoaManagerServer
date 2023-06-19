import { ApiProperty } from '@nestjs/swagger';
import { RewardElement } from '../interfaces/reward.interface';

export class RewardDto {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: [RewardElement] })
  rewards: RewardElement[];
}
