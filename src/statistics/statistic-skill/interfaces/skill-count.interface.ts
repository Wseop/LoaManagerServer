import { ApiProperty } from '@nestjs/swagger';

export class SkillLevelCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  skillLevel: number;
}

export class TripodCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  tripodName: string;
}

export class RuneCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  runeName: string;
}

export class SkillCount {
  @ApiProperty()
  count: number;

  @ApiProperty()
  skillName: string;

  @ApiProperty({ type: [SkillLevelCount] })
  skillLevelCounts: SkillLevelCount[];

  @ApiProperty({ type: [TripodCount] })
  tripodCounts: TripodCount[];

  @ApiProperty({ type: [RuneCount] })
  runeCounts: RuneCount[];
}
