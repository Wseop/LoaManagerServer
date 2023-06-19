import { ApiProperty } from '@nestjs/swagger';

export class ProfileStat {
  @ApiProperty()
  치명: number;

  @ApiProperty()
  특화: number;

  @ApiProperty()
  제압: number;

  @ApiProperty()
  신속: number;

  @ApiProperty()
  인내: number;

  @ApiProperty()
  숙련: number;

  @ApiProperty()
  '최대 생명력': number;

  @ApiProperty()
  공격력: number;
}

export class CharacterProfile {
  @ApiProperty()
  expeditionLevel: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  guildName: string;

  @ApiProperty()
  usingSkillPoint: number;

  @ApiProperty()
  totalSkillPoint: number;

  @ApiProperty({ type: ProfileStat })
  stats: ProfileStat;

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
