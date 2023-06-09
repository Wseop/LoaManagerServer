export class StatisticsSet {
  count: number;
  [classEngrave: number]:
    | number
    | {
        count: number;
        [set: string]: number;
      };
}
