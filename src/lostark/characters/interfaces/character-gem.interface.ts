import { ApiProperty } from '@nestjs/swagger';

export class CharacterGem {
  @ApiProperty()
  type: string;

  @ApiProperty()
  gemLevel: number;

  @ApiProperty()
  iconPath: string;

  @ApiProperty()
  itemGrade: string;

  @ApiProperty()
  skillName: string;
}
