import React, { useEffect, useState } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";

const Dashboard = () => {
  const [gamesData, setgamesData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(response => {
        setgamesData(response.data.games);
      });
  }, []);

  return (
    <div>
      <h1>DASHBOARD!</h1>
      <ul>
        {gamesData.length > 0 &&
          gamesData.map(game => {
            return <li key={game.id}>{game.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Dashboard;
