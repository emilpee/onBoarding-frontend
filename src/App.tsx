import React, { useState, FunctionComponent } from "react";
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

interface test extends RouteComponentProps<any> {
  handleLogin: () => void;
}

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

const App: FunctionComponent<test> = (props) => {
  const [user, setUser] = useState(false);

  const handleLogin = (e): void => {
    e.preventDefault();
    setUser(true);
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default App;
