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
      <Header user={null} />
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
