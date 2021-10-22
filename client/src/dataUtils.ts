import { MeetingDay } from 'wtp-shared';
import { getAccessToken } from './oauth/authUtils';

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
    let json = await (await data.text()).replaceAll('"', '');
    return json;
  } catch {
    return undefined;
  }
}

export async function getFreeTimesInDay(day: Date) {
  let url;
  let formattedDay = day.toISOString().split('T')[0];

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/free-times/' + formattedDay;
  else url = 'https://shs-wtp.vercel.app/api/free-times/' + formattedDay;

  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (data.status === 404) return undefined;

    let json = await data.json();
    return json;
  } catch {
    return undefined;
  }
}

export async function updateFreeTimes(day: MeetingDay) {
  let url;

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/update-day/';
  else url = 'https://shs-wtp.vercel.app/api/update-day';

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({
        day,
      }),
    });
  } catch {
    return false;
  }

  return true;
}
