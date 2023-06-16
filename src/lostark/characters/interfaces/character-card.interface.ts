import { ApiProperty } from '@nestjs/swagger';

export class CharacterCard {
  @ApiProperty()
  cardSet: string;

  @ApiProperty()
  awaken: number;
}
