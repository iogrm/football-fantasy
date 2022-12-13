export class Position {
  position_number: number | undefined;
  constructor(arg: number) {
    if (-1 < arg && arg < 15) {
      this.position_number = arg;
    }
  }
}
