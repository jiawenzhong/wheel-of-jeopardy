import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as ROUTES from './constants';
import * as Screens from './pages';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <App>
        <Switch>
        <Route exact path={ROUTES.HOME}>
          <Screens.Home />
        </Route>
        <Route exact path={ROUTES.GAME}>
          <Screens.Game />
        </Route>
        </Switch>
      </App>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
