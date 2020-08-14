import React, { FunctionComponent } from "react";
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

const App: FunctionComponent<AppProps> = () => {
  const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          sessionStorage.getItem("loggedIn") === "true" ? (
            <Component {...rest} {...props} />
          ) : (
            // TODO - remove redirect if signed in
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  const handleLogin = (e): void => {
    e.preventDefault();
    sessionStorage.setItem("loggedIn", true.toString());
  };

  return (
    <>
      <Router>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/login"
          render={(props) => <Login handleLogin={handleLogin} {...props} />}
        />
        <ProtectedRoute
          exact
          user={sessionStorage.getItem("loggedIn")}
          path="/dashboard"
          component={Dashboard}
        />
      </Router>
    </>
  );
};

export default App;
