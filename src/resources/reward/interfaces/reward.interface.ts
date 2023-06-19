import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RewardElementItem {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  item: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  count: number;
}

export class RewardElement {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty({ type: [RewardElementItem] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RewardElementItem)
  items: RewardElementItem[];
}
