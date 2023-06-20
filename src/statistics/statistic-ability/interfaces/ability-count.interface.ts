import { ApiProperty } from '@nestjs/swagger';

export class AbilityCount {
  @ApiProperty()
  ability: string;

  @ApiProperty()
  count: number;
}
