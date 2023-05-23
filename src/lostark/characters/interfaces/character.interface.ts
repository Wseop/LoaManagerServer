export interface CharacterProfile {
  expeditionLevel: number;
  title: string;
  guildName: string;
  usingSkillPoint: number;
  totalSkillPoint: number;
  stats: {
    [type: string]: number;
  };
  serverName: string;
  characterName: string;
  characterLevel: number;
  className: string;
  itemLevel: number;
}

export interface CharacterEquipment {
  type: string;
  name: string;
  iconPath: string;
  grade: string;
  itemLevel?: number;
  quality?: number;
  itemSet?: { name: string; level: number };
  isElla?: boolean;
  abilities?: {
    [ability: string]: number;
  };
  braceletEffects?: string[];
  elixirs?: {
    [elixir: string]: number;
  };
  engraves?: {
    [engrave: string]: number;
  };
}

export interface CharacterSkill {
  skillName: string;
  skillLevel: number;
  tripods: {
    tripodName: string;
    tripodLevel: number;
  }[];
  rune: {
    runeName: string;
    grade: string;
    iconPath: string;
  };
}

export interface CharacterEngrave {
  name: string;
  level: number;
}

export interface CharacterCard {
  cardSet: string;
  awaken: number;
}

export interface CharacterGem {
  type: string;
  level: number;
  iconPath: string;
  grade: string;
  skillName: string;
}

export interface CharacterCollectible {
  type: string;
  point: number;
  maxPoint: number;
}

export interface CharacterInfo {
  profile: CharacterProfile;
  equipments: { [type: string]: CharacterEquipment };
  skills: CharacterSkill[];
  engraves: CharacterEngrave[];
  cards: CharacterCard[];
  gems: CharacterGem[];
  collectibles: CharacterCollectible[];
}
