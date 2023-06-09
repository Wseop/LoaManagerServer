export class StatisticsEngrave {
  count: number;
  [classEngrave: string]:
    | number
    | {
        count: number;
        [engraveName: string]: number;
      };
}
