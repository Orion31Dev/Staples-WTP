import { MeetingDay } from 'wtp-shared';
import DraftStatuses from 'wtp-shared/DraftStatusInterfaces';
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
    let text = (await data.text()).replaceAll('"', '');
    if (text.includes('Not authenticated')) return undefined;

    return text;
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

export async function getDraftStatuses() {
  let url;

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/draft-status';
  else url = 'https://shs-wtp.vercel.app/api/draft-status';

  let data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return await data.json();
}

export async function updateDraftStatuses(data: DraftStatuses) {
  let url;

  if (process.env.NODE_ENV !== 'production') url = 'http://localhost:3001/api/update-draft-status/';
  else url = 'https://shs-wtp.vercel.app/api/update-draft-status';

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({
        data,
      }),
    });
  } catch {
    return false;
  }

  return true;
}
