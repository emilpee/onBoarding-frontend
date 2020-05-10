import React from "react";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Button } from "react-bootstrap";
import "./styles.scss";

const Login = () => {
  const handleConnectClick = () => {
    function generateUrlWithState() {
      const state = Math.random()
        .toString(36)
        .substring(7);
      return `https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=http://localhost:8080/oauth`;
    }

    window.location.href = generateUrlWithState();
  };

  return (
    <main className="login">
      <h1>onBoarding</h1>
      <p className="text-center">
        Welcome! In order to use this application, you must connect to Board
        Game Atlas. Click the button to authenticate.
      </p>

      <Button
        className="btn"
        variant="primary-button"
        onClick={handleConnectClick}
      >
        Connect to BGA
      </Button>
    </main>
  );
};

export default Login;
