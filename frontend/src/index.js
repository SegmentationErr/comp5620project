import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PlayGamePage from './components/PlayGamePage';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" component={HomePage} />
        {/* <Route path="/" component={PlayGamePage} /> */}

      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
