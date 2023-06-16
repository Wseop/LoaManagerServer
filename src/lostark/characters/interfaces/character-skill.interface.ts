import { ApiProperty } from '@nestjs/swagger';

class Tripod {
  @ApiProperty()
  tripodName: string;

  @ApiProperty()
  tripodLevel: number;
}

class Rune {
  @ApiProperty()
  runeName: string;

  @ApiProperty()
  itemGrade: string;

  @ApiProperty()
  iconPath: string;
}

export class CharacterSkill {
  @ApiProperty()
  skillName: string;

  @ApiProperty()
  skillLevel: number;

  @ApiProperty({ type: [Tripod] })
  tripods: Tripod[];

  @ApiProperty({ type: Rune })
  rune?: Rune;
}
