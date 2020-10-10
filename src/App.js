import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './screens/Main';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './screens/Login';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
