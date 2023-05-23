export interface StatsArmorySetting {
  count: number;
  [classEngraveCode: string]:
    | number
    | {
        count: number;
        abilities: {
          [ability: string]: number;
        };
        engraves: {
          [engraveName: string]: number;
        }[];
        itemSets: {
          [itemSet: string]: number;
        };
        elixirs: {
          [elixir: string]: number;
        };
      };
}
