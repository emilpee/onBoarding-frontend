import React, { useEffect, useState, FunctionComponent } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Header } from "../../components/";
import { GameObject, User } from "../../interfaces";
import { Container } from "react-bootstrap";
import "./styles.scss";

interface DashboardProps {
  user: User;
}

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  const { user = null } = props;
  const [gamesData, setgamesData] = useState<GameObject[]>([]);
  const [signedInUser, setSignedInUser] = useState<User>(user);
  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/user/data?client_id=${CLIENT_ID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        setSignedInUser(data.user);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(
        `https://www.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(({ data }) => {
        setgamesData(data.games);
      });
  }, [gamesData]);

  return (
    <>
      <Header user={signedInUser} />
      <Container className="container" fluid>
        <ul>
          {gamesData.length > 0 &&
            gamesData.map((game: GameObject) => {
              return <li key={game.id}>{game.name}</li>;
            })}
        </ul>
      </Container>
    </>
  );
};

export default Dashboard;
