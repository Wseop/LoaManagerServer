import { ApiProperty } from '@nestjs/swagger';

export class ClassEngraveCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  classEngrave: string;
}
