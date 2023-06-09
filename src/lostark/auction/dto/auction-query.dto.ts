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

export class AuctionQueryDto {
  @ApiProperty({ required: true, type: Number, example: 210000 })
  @IsNumber()
  @Type(() => Number)
  categoryCode: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quality?: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  skillCodes?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  tripodCodes?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  abilityCodes?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  engraveCodes?: number[];

  @ApiProperty({ required: false, type: Number, example: 3 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  itemTier?: number;

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
