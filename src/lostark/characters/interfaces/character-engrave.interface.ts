import { ApiProperty } from '@nestjs/swagger';

export class CharacterEngrave {
  @ApiProperty()
  engraveName: string;

  @ApiProperty()
  engraveLevel: number;
}
