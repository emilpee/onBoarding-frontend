import React, { useState, FunctionComponent, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import "./scss/index.scss";
import { Login, Dashboard } from "./views";

interface MyInterface {
  id: string;
}

interface test extends RouteComponentProps {
  handleLogin: () => void;
}

const App: FunctionComponent<test> = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const query = window.location.search.substring(1);
    const token = query.split("access_token=")[1];

    if (token) {
      setUser(true);
    }
  }, [user]);

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
    setUser(true);
  };

  return (
    <>
      <Router>
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              {...props}
              handleLogin={handleLogin}
              user={user.toString()}
            />
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
