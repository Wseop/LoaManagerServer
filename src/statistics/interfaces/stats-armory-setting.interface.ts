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
          [engraveCode: string]: number;
        }[];
        itemSets: {
          [itemSet: string]: number;
        };
        elixirs: {
          [elixir: string]: number;
        };
      };
}
