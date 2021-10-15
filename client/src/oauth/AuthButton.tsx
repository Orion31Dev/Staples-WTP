import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { getUserInfo, refreshTokenSetup, setAccessToken } from './authUtils';

const clientId = process.env.REACT_APP_CLIENT_ID;
export default function AuthButton(props: { onSuccess?: Function; styleAsLink?: boolean }) {
  let [loggedIn, setLoggedIn] = useState(false);
  let [userName, setUserName] = useState('');

  function onSuccess(res: any) {
    refreshTokenSetup(res);
    setAccessToken(res.tokenId);

    getUserInfo().then((user: any) => {
      setLoggedIn(true);
      setUserName(user.name);
    });

    props.onSuccess?.();
  }

  function onFailure(res: any) {
    console.error('login failed ', res);
  }

  useEffect(() => {
    getUserInfo().then((u: any) => {
      if (u) {
        setLoggedIn(true);
        setUserName(u.name);
      }
    });
  }, []);

  return (
    <div className={'login ' + (props.styleAsLink ? 'link' : 'button')}>
      {!loggedIn ? (
        <GoogleLogin
          clientId={clientId || ''}
          render={LoginButton}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <div onClick={() => {window.location.href = "/profile"}}>{userName}</div>
      )}
    </div>
  );
}

function LoginButton(renderProps: any) {
  return (
    <div className="btn-login" onClick={renderProps.onClick}>
      Login
    </div>
  );
}
