export class StatisticsCountDto {
  count: number;
  [key: string]:
    | number
    | {
        count: number;
        [key: string]: number;
      };
}
