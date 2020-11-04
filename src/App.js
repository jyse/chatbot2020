import React from "react";
import "./App.css";
import ChatBot from "./screens/ChatBot";
import Main from "./screens/Main";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForumPage from "./screens/ForumPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forum">
          <ForumPage />
        </Route>

        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/chatbot">
          <ChatBot />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
