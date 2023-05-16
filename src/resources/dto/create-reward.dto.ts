import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RewardElement } from '../schemas/reward.schema';
import { Type } from 'class-transformer';

export class CreateRewardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: [RewardElement] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RewardElement)
  rewards: RewardElement[];
}
