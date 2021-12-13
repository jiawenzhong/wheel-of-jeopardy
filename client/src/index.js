import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/History';
import * as ROUTES from './constants';
import * as Screens from './pages';

window.localStorage.setItem(ROUTES.SCORE_STORAGE, 0);
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
        <Route exact path={ROUTES.SETUP}>
          <Screens.PreGame />
        </Route>
        <Route exact path={ROUTES.SELECT_QUESTION}>
          <Screens.SelectQuestion />
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
