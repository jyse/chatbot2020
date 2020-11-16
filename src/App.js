import React, { useState, useEffect } from "react";
import "./App.css";
import ChatBot from "./screens/ChatBot";
import PageLayout from "./components/PageLayout";
import Login from "./screens/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Dashboard from "./screens/Dashboard/Dashboard";
import { auth, db } from "./firebase";
import { actionTypes } from "./reducer";

const authHoc = (Component) => (props) => {
  const [{ user }, dispatch] = useStateValue();

  return user ? <Component {...props} /> : <Redirect to="/login" />;
};

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isInitialised, setInitialised] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userSnap = await db
            .collection("users")
            .where("userId", "==", user.uid)
            .limit(1)
            .get();
          if (userSnap.empty) return;

          const [userDoc] = userSnap.docs;
          const userData = userDoc.data();
          const payload = {
            ...user,
            ...userData,
          };
          dispatch({
            type: actionTypes.SET_USER,
            user: payload,
          });
        } else {
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitialised(true);
      }
    });
  }, []);

  const Layout = user ? PageLayout : "div";

  return (
    <div className="app">
      <Router>
        <Layout>
          {isInitialised ? (
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/board/:userDocId" component={authHoc(Dashboard)} />
              <Route path="/chatbot/:userId" component={authHoc(ChatBot)} />
            </Switch>
          ) : (
            <p>Loading...</p>
          )}
        </Layout>
      </Router>
    </div>
  );
};
export default App;
