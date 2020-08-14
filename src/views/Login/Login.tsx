import React, { FunctionComponent, useState, useEffect } from "react";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Button, Container, Row } from "react-bootstrap";
import "./styles.scss";

interface LoginProps {
  user: any;
  handleLogin: (e: React.MouseEvent) => void;
}

const Login: FunctionComponent<LoginProps> = (props) => {
  const handleConnectClick = (e): void => {
    function generateUrlWithState() {
      props.handleLogin(e);
      const state = Math.random()
        .toString(36)
        .substring(7);
      return `https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=http://localhost:8080/oauth`;
    }
    window.location.href = generateUrlWithState();
  };

  return (
    <div className="login">
      <Row>
        <h1>onBoarding</h1>
      </Row>
      <Row noGutters>
        <p className="text-center">
          Welcome! In order to use this application, you must authenticate with
          Board Game Atlas. Click the button to connect.
        </p>
      </Row>
      <Row>
        <Button variant="info" type="button" onClick={handleConnectClick}>
          Connect to BGA
        </Button>
      </Row>
    </div>
  );
};

export default Login;
