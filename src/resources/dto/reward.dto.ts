import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { RewardElement } from '../schemas/reward.schema';

export class RewardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: [RewardElement] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  rewards: RewardElement[];
}
