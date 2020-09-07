import React, { useEffect, useState, FunctionComponent } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Header, Footer } from "../../components/";
import { GameObject, User } from "../../interfaces";
import { UserContext } from "../../context/userContext";
import { Container, Spinner } from "react-bootstrap";
import "./styles.scss";

interface DashboardProps {
  user: User;
}

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  const { user } = props;
  const [gamesData, setgamesData] = useState<GameObject[]>([]);
  const [signedInUser, setSignedInUser] = useState<User>(null);
  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];
  const id = query.split("user=")[1];

  useEffect(() => {
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(({ data }) => {
        setgamesData(data.games);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then(({ data }) => {
        setSignedInUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, token, id, signedInUser]);

  return (
    <UserContext.Provider value={signedInUser}>
      <Header user={signedInUser} />
      <Container className="container" fluid>
        <h1>Dashboard</h1>
        <ul>
          {gamesData.length > 0 ? (
            gamesData.map((game: GameObject) => {
              return <li key={game.id}>{game.name}</li>;
            })
          ) : (
            <Spinner animation="border" color="primary" />
          )}
        </ul>
      </Container>
      <Footer />
    </UserContext.Provider>
  );
};

export default Dashboard;
