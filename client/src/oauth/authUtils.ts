import Cookies from 'universal-cookie';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.REACT_APP_CLIENT_ID);

const cookies = new Cookies();

export function refreshTokenSetup(res: any) {
  let refreshTime = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  async function refreshToken() {
    const newAuthRes = await res.reloadAuthResponse();
    let refreshTime = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    setAccessToken(newAuthRes.tokenId);
    setTimeout(refreshToken, refreshTime);
  }

  setTimeout(refreshToken, refreshTime);
}

export function setAccessToken(accessToken: string) {
  cookies.set('accessToken', accessToken, { path: '/' });
}

export function getAccessToken() {
  return cookies.get('accessToken');
}

export async function getUserInfo() {
  try {
    let e = (
      await client.verifyIdToken({
        idToken: getAccessToken(),
        audience: process.env.REACT_APP_CLIENT_ID,
      })
    ).getPayload();
    return e;
  } catch (err) {
    return null;
  }
}
