import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemGrade } from '../../enums/item-grade.enum';

export class MarketQueryDto {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  @Type(() => Number)
  categoryCode: number;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  className?: string;

  @ApiProperty({ required: false, enum: ItemGrade })
  @IsOptional()
  @IsEnum(ItemGrade)
  itemGrade?: ItemGrade;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  itemName?: string;

  @ApiProperty({ required: false, type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  pageAll?: boolean;
}
