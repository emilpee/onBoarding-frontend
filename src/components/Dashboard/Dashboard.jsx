import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CLIENT_ID } from '../../boardgameatlas.config'

const Dashboard = () => {
  const [gamesData, setgamesData] = useState([]);
  const [user, setUser] = useState(null);
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
  });

  useEffect(() => {
    axios
      .get(
        `https://www.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(({ data }) => {
        setgamesData(data.games);
      });
  }, []);

  return (
    <div>
      <h1>DASHBOARD!</h1>
      {user !== null && <h3>Welcome {user.username}!</h3>}
      <ul>
        {gamesData.length > 0 &&
          gamesData.map((game) => {
            return <li key={game.id}>{game.name}</li>;
          })}
      </ul>
    </div>
  );
};

    return (
        <div>
            <h1>DASHBOARD!</h1>
            {user !== null && <h3>Hej {user.username}!</h3>}
            <ul>
                {gamesData.length > 0 &&
                    gamesData.map((game) => {
                        return <li key={game.id}>{game.name}</li>
                    })}
            </ul>
        </div>
    )
}

export default Dashboard
