import React, { useState, FunctionComponent, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import "./scss/index.scss";
import { Login, Dashboard } from "./views";

interface AppProps extends RouteComponentProps {
  handleLogin: () => void;
}

const App: FunctionComponent<AppProps> = (props) => {
  const [user, setUser] = useState<boolean>(false);
  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];

  console.log(user);

  const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    );
  };

  const handleLogin = (e): void => {
    e.preventDefault();
    localStorage.setItem("user", true.toString());
  };

  return (
    <>
      <Router>
        <Route path="/" render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login handleLogin={handleLogin} {...props} user={user} />
          )}
        />
        <ProtectedRoute
          user={user}
          exact
          path="/dashboard"
          component={Dashboard}
        />
      </Router>
    </>
  );
};

export default App;
