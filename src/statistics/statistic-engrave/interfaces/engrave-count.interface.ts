import { ApiProperty } from '@nestjs/swagger';

export class EngraveCount {
  @ApiProperty()
  engrave: string;

  @ApiProperty()
  count: number;
}
