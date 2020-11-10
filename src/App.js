import React from "react";
import "./App.css";
import ChatBot from "./screens/ChatBot";
import Main from "./screens/Main";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForumPage from "./screens/ForumPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {/* {!user ? (
        <Login />
      ) : ( */}
      <Router>
        <Switch>
          <Route path="/forum">
            <ForumPage />
          </Route>
          <Route exact path="/">
            <ChatBot />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          {/* <Route exact path="/signup2">
              <SignUp />
            </Route> */}
        </Switch>
      </Router>
      )}
    </div>
  );
};
export default App;
