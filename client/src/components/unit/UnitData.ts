export async function getUnitData() {
  //let data = await fetch('http://localhost:3001/api/unit-data');
  let data = await fetch('https://shs-wtp.vercel.app/api/unit-data');

  return await data.json();
}
