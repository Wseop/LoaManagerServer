import { ApiProperty } from '@nestjs/swagger';

export class SetCount {
  @ApiProperty()
  set: string;

  @ApiProperty()
  count: number;
}
