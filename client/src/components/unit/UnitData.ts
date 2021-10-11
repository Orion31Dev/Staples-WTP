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
  videos: IVideo[];
}

export interface IQuestions {
  main: string;
  sub: string[];
}

export interface IVideo {
  title: string;
  link: string;
}

export async function getUnitData() {
  //let data = await fetch('http://localhost:3001/api/unit-data');
  let data = await fetch('https://shs-wtp.vercel.app/api/unit-data').then(res => res.json());

  return await data.json();
}
