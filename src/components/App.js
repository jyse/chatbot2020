import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Main from "../screens/Main";
import Login from "../screens/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    console.log("hi wre are in app");
    return (
      <Router>
        <div className="App">
          {/* <Route path="/Login" component={Login} /> */}
          {/* <Route path="/" component={Main} /> */}
        </div>
      </Router>
    );
  }
}
export default App;
