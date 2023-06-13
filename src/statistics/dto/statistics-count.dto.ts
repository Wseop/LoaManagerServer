export class StatisticsCount {
  count: number;
  [key: string]:
    | number
    | {
        count: number;
        [key: string]: number;
      };
}
