import React from "react";
import "./App.css";
import ChatBot from "./screens/ChatBot";
import PageLayout from "./components/PageLayout";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import UserDashboardGrid from "./components/UserDashboardGrid";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <PageLayout>
            <Switch>
              <Route exact path="/board/:userDocId">
                <UserDashboardGrid />
              </Route>
              <Route exact path="/chatbot/:userId">
                <ChatBot />
              </Route>
              {/* <Route exact path="/signup2">
              <SignUp />
            </Route> */}
            </Switch>
          </PageLayout>
        </Router>
      )}
    </div>
  );
};
export default App;
