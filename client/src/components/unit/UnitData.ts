export async function getUnitData() {
  let data;
  
  if (process.env.NODE_ENV !== 'production') data = await fetch('http://localhost:3001/api/unit-data');
  else data = await fetch('https://shs-wtp.vercel.app/api/unit-data');

  return await data.json();
}
