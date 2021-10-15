import { getAccessToken } from '../../oauth/authUtils';

export async function getUnitData() {
  let url;

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/unit-data';
  else url = 'https://shs-wtp.vercel.app/api/unit-data';

  let data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  console.log(await getUserUnit());
  return await data.json();
}

export async function getUserUnit() {
  let url;

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/me/unit';
  else url = 'https://shs-wtp.vercel.app/api/me/unit';

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  try {
    let json = await data.text();
    return json;
  } catch {
    return undefined;
  }
}
