import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" component={HomePage} />

      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
