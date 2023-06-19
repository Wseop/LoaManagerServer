import { ApiProperty } from '@nestjs/swagger';

export class ClassDto {
  @ApiProperty()
  parent: string;

  @ApiProperty()
  child: string[];
}
