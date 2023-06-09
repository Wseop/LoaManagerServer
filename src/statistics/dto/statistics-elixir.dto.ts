export class StatisticsElixir {
  count: number;
  [classEngrave: string]:
    | number
    | {
        count: number;
        [elixir: string]: number;
      };
}
