import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Main from "./screens/Main";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
