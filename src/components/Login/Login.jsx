import React, { useState, useEffect } from "react";
import { CLIENT_ID } from "../../boardgameatlas.config";
import "./styles.scss";

const Login = props => {
  useEffect(() => {}, []);

  const handleConnectClick = () => {
    function generateUrlWithState() {
      // TODO - kryptera
      const state = Math.random()
        .toString(36)
        .substring(7);
      return `https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=http://localhost:8080/oauth/redirect`;
    }

    window.location.href = generateUrlWithState();
  };

  return (
    <main className="login container">
      <h1>onBoarding</h1>
      <p>
        Welcome! In order to use this application, you must connect to Board
        Game Atlas. Click the button to begin authenticating.
      </p>

      <a onClick={handleConnectClick} className="ui button">
        Connect to BGA
      </a>
    </main>
  );
};

export default Login;
