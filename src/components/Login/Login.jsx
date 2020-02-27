import React, { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";
import "./styles.scss";

const Login = props => {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ email, password });

  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];

  useEffect(() => {}, []);

  const handleOauth = () => {
    const config = {
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=localhost:3000/dashboard`,
      headers: {
        Authorization: "token " + token
      }
    };

    axios(config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        throw Error(err);
      });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setUser({
      email,
      password
    });
    // history.push("/dashboard");
  };

  const handleInputChange = event => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  return (
    <main className="login container">
      <h1>onBoarding</h1>
      <form onSubmit={handleFormSubmit} className="ui form">
        <h3>Sign in</h3>
        <div className="input field">
          <label htmlFor="email">Email</label>
          <input onChange={handleInputChange} type="email" id="email"></input>
        </div>
        <div className="input field">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleInputChange}
            type="password"
            id="password"
          ></input>
        </div>
        <div className="input field">
          <button className="ui button" type="submit">
            Login
          </button>
        </div>

        <button onClick={handleOauth} className="ui button" type="submit">
          Oauth
        </button>
      </form>
    </main>
  );
};

export default Login;
