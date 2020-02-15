import React, { useState, useEffect } from "react";
import "./styles.scss";

const Login = props => {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ email, password });

  useEffect(() => {}, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    setUser({
      email,
      password
    });
    history.push("/dashboard");
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
        <h2>Sign in</h2>
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
      </form>
    </main>
  );
};

export default Login;
