export class CharacterProfile {
  expeditionLevel: number;
  title: string;
  guildName: string;
  usingSkillPoint: number;
  totalSkillPoint: number;
  stats: {
    [stat: string]: number;
  };
  serverName: string;
  characterName: string;
  characterLevel: number;
  className: string;
  itemLevel: number;
}

export class CharacterEquipment {
  type: string;
  name: string;
  iconPath: string;
  itemGrade: string;
  quality?: number;
  itemLevel?: number;
  itemSet?: {
    setName: string;
    setLevel: number;
  };
  elixirs?: {
    [elixir: string]: number;
  };
  abilities?: {
    [ability: string]: number;
  };
  engraves?: {
    [engrave: string]: number;
  };
  braceletEffects?: string[];
  isElla?: boolean;
}

export class CharacterSkill {
  skillName: string;
  skillLevel: number;
  tripods: {
    tripodName: string;
    tripodLevel: number;
  }[];
  rune: {
    runeName: string;
    itemGrade: string;
    iconPath: string;
  };
}

export class CharacterGem {
  type: string;
  gemLevel: number;
  iconPath: string;
  itemGrade: string;
  skillName: string;
}

export class CharacterEngrave {
  engraveName: string;
  engraveLevel: number;
}

export class CharacterCard {
  cardSet: string;
  awaken: number;
}

export class CharacterCollectible {
  type: string;
  point: number;
  maxPoint: number;
}

export class CharacterInfoDto {
  profile: CharacterProfile;
  equipments: {
    [equipment: string]: CharacterEquipment;
  };
  skills: CharacterSkill[];
  gems: CharacterGem[];
  engraves: CharacterEngrave[];
  cards: CharacterCard[];
  collectibles: CharacterCollectible[];
}
