export interface IUnitData {
  1: IUnit;
  2: IUnit;
  3: IUnit;
  4: IUnit;
  5: IUnit;
  6: IUnit;
}

export interface IUnit {
  topic: string;
  questions: IQuestions[];
}

export interface IQuestions {
  main: string;
  sub: string[];
}
