import React from 'react';

import '../styles/login.scss';

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://spotify-profile.herokuapp.com/login';

const LoginScreen = () => (
  <main className="login">
    <h1>Spotify Profile</h1>
    <a className="login__button" href={LOGIN_URI}>Log in to Spotify</a>
  </main>
);

export default LoginScreen;