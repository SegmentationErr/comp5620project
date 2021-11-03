import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import GameHall from './components/GameHall';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import NewGame from './components/NewGame';
import PlayGamePage from './components/PlayGamePage';

ReactDOM.render(
  <Router>
    <div>
        <Route path="/MotionDetectionGame" component={NavigationBar} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/MotionDetectionGame/gamehall" component={GameHall} />
        <Route exact path="/MotionDetectionGame/create_game" component={NewGame} />
        <Route exact path="/test" component={PlayGamePage} />

      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
