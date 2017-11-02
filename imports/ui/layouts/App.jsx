import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage     from '../../ui/pages/HomePage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}