export class StatisticsAbility {
  count: number;
  [classEngrave: string]:
    | number
    | {
        count: number;
        [ability: string]: number;
      };
}
