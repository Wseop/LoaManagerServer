import { ApiProperty } from '@nestjs/swagger';

class EquipmentItemSet {
  @ApiProperty()
  setName: string;

  @ApiProperty()
  setLevel: number;
}

export class CharacterEquipment {
  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  iconPath: string;

  @ApiProperty()
  itemGrade: string;

  @ApiProperty()
  quality?: number;

  @ApiProperty()
  itemLevel?: number;

  @ApiProperty({ type: EquipmentItemSet })
  itemSet?: EquipmentItemSet;

  @ApiProperty()
  elixirs?: {
    [elixir: string]: number;
  };

  @ApiProperty()
  abilities?: {
    [ability: string]: number;
  };

  @ApiProperty()
  engraves?: {
    [engrave: string]: number;
  };

  @ApiProperty()
  braceletEffects?: string[];

  @ApiProperty()
  isElla?: boolean;
}
