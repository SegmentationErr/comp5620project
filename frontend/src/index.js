import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import GameHall from './components/GameHall';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import PlayGamePage from './components/PlayGamePage';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/gamehall" component={GameHall} />
        <Route exact path="/navigationbar" component={NavigationBar} />

      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
