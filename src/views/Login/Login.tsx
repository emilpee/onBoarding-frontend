import React, { FunctionComponent, useState, useEffect } from "react";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Button, Container, Row } from "react-bootstrap";
import "./styles.scss";
import { User } from "interfaces";
import axios from "axios";

interface LoginProps {
  handleLogin: (e: React.MouseEvent) => void;
  user: string;
}

const Login: FunctionComponent<LoginProps> = (props) => {
  console.log(props);
  const [signedInUser, setSignedInUser] = useState<User>(null);

  const handleConnectClick = (): void => {
    function generateUrlWithState() {
      const state = Math.random()
        .toString(36)
        .substring(7);
      return `https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=http://localhost:8080/oauth`;
    }

    window.location.href = generateUrlWithState();
  };

  useEffect(() => {
    const query = window.location.search.substring(1);
    const token = query.split("access_token=")[1];

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/user/data?client_id=${CLIENT_ID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        setSignedInUser(data.user);
      });
  }, [signedInUser]);

  return (
    <Container className="login" fluid>
      <Row>
        <h1>onBoarding</h1>
      </Row>
      <Row>
        <p className="text-center">
          Welcome! In order to use this application, you must connect to Board
          Game Atlas. Click the button to authenticate.
        </p>
      </Row>
      <Row>
        <Button className="btn" variant="info" onClick={handleConnectClick}>
          Connect to BGA
        </Button>
      </Row>
    </Container>
  );
};

export default Login;
