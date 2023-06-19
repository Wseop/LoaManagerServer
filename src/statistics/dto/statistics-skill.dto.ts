export class StatisticsSkillDto {
  count: number;
  [classEngrave: string]:
    | number
    | {
        count: number;
        [skillName: string]:
          | number
          | {
              count: number;
              levels: {
                [level: string]: number;
              };
              tripods: {
                [tripodName: string]: number;
              };
              runes: {
                [runeName: string]: number;
              };
            };
      };
}
