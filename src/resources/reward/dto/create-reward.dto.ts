import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RewardElement } from '../interfaces/reward.interface';

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
