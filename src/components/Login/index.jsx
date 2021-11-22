import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import FacebookLogin from 'react-facebook-login';

import './styles.scss';

import { Logo } from '../../assets/Logo';

export function Login() {

  const { 
    setLogin, 
    setToken
  } = useContext(AuthContext);

  const APP_ID = 'APP ID FACEBOOK CODE';

  const responseFacebook = (response) => {
    console.log(response);

    if (!response.accessToken) {
        setLogin(false);
        console.log("Login failed");
    }

    setLogin(true);
    setToken(response.accessToken);
  }

  return (
    <div className="loginContainer">
            <Logo />
            <FacebookLogin 
              appId={APP_ID}
              autoLoad={true}
              scope="public_profile"
              callback={responseFacebook}
              size="medium"
              buttonStyle={{
                "backgroundColor": "#1479EF",
                "borderRadius": "5px"
              }}
              icon="fa-facebook" 
              textButton = "&nbsp;&nbsp;Logar com Facebook"  
              />
              
    </div>
  );
}