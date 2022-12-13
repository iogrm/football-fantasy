export class Id {
  id: number;
  static parseId(arg: string) {
    const argInt = parseInt(arg);
    return new Id(argInt);
  }
  constructor(code: number) {
    this.id = code;
  }
}

export class TeamId extends Id {
  constructor(code: number) {
    super(code);
  }
}

export class PlayerId extends Id {
  constructor(code: number) {
    super(code);
  }
}
