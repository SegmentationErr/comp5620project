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
        <Route path="/MotionDetectionGame" component={NavigationBar} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/MotionDetectionGame/gamehall" component={GameHall} />

      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
