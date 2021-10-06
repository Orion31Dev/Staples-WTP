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
  gDrive: string;
  questions: IQuestions[];
  videos: IVideo[]
}

export interface IQuestions {
  main: string;
  sub: string[];
}

export interface IVideo {
  title: string;
  link: string;
}