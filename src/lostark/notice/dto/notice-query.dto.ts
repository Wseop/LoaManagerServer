import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NoticeType } from '../enums/notice-type.enum';

export class NoticeQueryDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiProperty({ required: false, enum: NoticeType })
  @IsOptional()
  @IsEnum(NoticeType)
  type?: NoticeType;
}
