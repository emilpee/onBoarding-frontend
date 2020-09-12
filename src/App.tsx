import Footer from "components/Footer";
import Header from "components/Header";
import React, { FunctionComponent, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import "./scss/index.scss";
import { Login, Dashboard, GameList } from "./views";
import axios from "axios";
import { UserContext } from "context/userContext";

interface AppProps extends RouteComponentProps {
  handleLogin: () => void;
}

const App: FunctionComponent<AppProps> = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const query = window.location.search.substring(1);
    const token = query.split("access_token=")[1];
    const id = query.split("user=")[1];

    if (token) {
      axios
        .get(`http://localhost:8080/users/${id}`)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  });

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          sessionStorage.getItem("loggedIn") === JSON.stringify(true) ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  const handleLogin = (e): void => {
    e.preventDefault();
    sessionStorage.setItem("loggedIn", JSON.stringify(true));
  };

  return (
    <>
      {sessionStorage.getItem("loggedIn") === JSON.stringify(true) ? (
        <Router>
          <UserContext.Provider value={user}>
            <Header />
            <ProtectedRoute exact path="/games" component={GameList} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Footer />
          </UserContext.Provider>
        </Router>
      ) : (
        <Router>
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route
            exact
            path="/login"
            render={(props) => <Login handleLogin={handleLogin} {...props} />}
          />
        </Router>
      )}
    </>
  );
};

export default App;
