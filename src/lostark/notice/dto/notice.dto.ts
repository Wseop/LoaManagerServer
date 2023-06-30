import { ApiProperty } from '@nestjs/swagger';

export class NoticeDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  link: string;
}
