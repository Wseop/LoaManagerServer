import { ApiProperty } from '@nestjs/swagger';
import { CharacterProfile } from '../interfaces/character-profile.interface';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterSkill } from '../interfaces/character-skill.interface';
import { CharacterGem } from '../interfaces/character-gem.interface';
import { CharacterEngrave } from '../interfaces/character-engrave.interface';
import { CharacterCard } from '../interfaces/character-card.interface';
import { CharacterCollectible } from '../interfaces/character-collectible.interface';

export class CharacterInfoDto {
  @ApiProperty({ type: CharacterProfile })
  profile: CharacterProfile;

  @ApiProperty({ type: [CharacterEquipment] })
  equipments: CharacterEquipment[];

  @ApiProperty({ type: [CharacterSkill] })
  skills: CharacterSkill[];

  @ApiProperty({ type: [CharacterGem] })
  gems: CharacterGem[];

  @ApiProperty({ type: [CharacterEngrave] })
  engraves: CharacterEngrave[];

  @ApiProperty({ type: [CharacterCard] })
  cards: CharacterCard[];

  @ApiProperty({ type: [CharacterCollectible] })
  collectibles: CharacterCollectible[];
}
