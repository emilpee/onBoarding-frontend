import React, { useEffect, useState } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { Header } from "../../components/";

interface GameObject {
  id: string;
  name: string;
  names: Array<string>;
  description: string;
  categories: Category[];
  year_published: number;
}

interface Category {
  id: number;
}

interface User {
  id: string;
  username: string;
  img: string;
}

const Dashboard = () => {
  const [gamesData, setgamesData] = useState<GameObject[]>([]);
  const [user, setUser] = useState<User>(null);
  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/user/data?client_id=${CLIENT_ID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        setUser(data.user);
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
    <div>
      <Header />
      {user !== null && <h3>Welcome {user.username}!</h3>}
      <ul>
        {gamesData.length > 0 &&
          gamesData.map((game: GameObject) => {
            return <li key={game.id}>{game.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Dashboard;
