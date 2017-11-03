import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Session } from 'meteor/session';
import  Utils from '../utils'

import HomePage     from '../../ui/pages/HomePage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AppBar from '../components/AppBar.jsx';

export default class App extends Component {
  constructor(props) {
    super(props)

    Session.set('appColor', Utils.randomColor()); 
    Session.set('appAnimal', Utils.randomAnimal()); 
  }

  render() {
    return (
      <div className="app">
        <AppBar />
        <Router>
          <main>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </Router>
      </div>
    )
  }
}