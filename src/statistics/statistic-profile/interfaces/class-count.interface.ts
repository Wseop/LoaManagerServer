import { ApiProperty } from '@nestjs/swagger';

export class ClassCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  className: string;
}
