import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemGrade } from 'src/lostark/enums/item-grade.enum';

export class MarketQueryDto {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  @Type(() => Number)
  categoryCode: Number;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  className?: String;

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
