import { ApiProperty } from '@nestjs/swagger';

export class CharacterCollectible {
  @ApiProperty()
  type: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  maxPoint: number;
}
