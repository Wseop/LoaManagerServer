import { ApiProperty } from '@nestjs/swagger';

export class InfoDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}
