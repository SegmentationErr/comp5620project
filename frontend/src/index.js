import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import FeedbackCard from './components/FeedbackCard';
import GameHall from './components/GameHall';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import NewGame from './components/NewGame';
import PlayGamePage from './components/PlayGamePage';
import TechStaff from './components/TechStaff';

ReactDOM.render(
  <Router>
    <div>
        <Route path="/MotionDetectionGame" component={NavigationBar} />
        <Route path="/TechnicalStaffPage" component={NavigationBar} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/MotionDetectionGame/gamehall" component={GameHall} />
        <Route exact path="/MotionDetectionGame/create_game" component={NewGame} />
        <Route exact path="/MotionDetectionGame/PlayGame_:id" component={PlayGamePage} />
        {/* <Route exact path="/test" component={PlayGamePage} /> */}
        <Route exact path="/TechnicalStaffPage" component={TechStaff} />
        <Route exact path="/testFeedback" component={FeedbackCard} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
