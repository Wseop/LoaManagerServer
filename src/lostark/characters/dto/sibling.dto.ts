import { ApiProperty } from '@nestjs/swagger';

export class SiblingDto {
  @ApiProperty()
  serverName: string;

  @ApiProperty()
  characterName: string;

  @ApiProperty()
  characterLevel: number;

  @ApiProperty()
  className: string;

  @ApiProperty()
  itemLevel: number;
}
