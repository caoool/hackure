import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Session } from 'meteor/session';
import  * as Utils from '../utils'

import HomePageContainer     from '../../ui/containers/HomePageContainer.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AppBar from '../components/AppBar.jsx';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.setColors();
  }

  setColors() {
    Session.set('primaryColor', Utils.getRandomColor());
  }

  render() {
    return (
      <div className="app">
        <AppBar />
        <Router>
          <main>
            <Switch>
              <Route exact path="/" component={HomePageContainer} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </Router>
      </div>
    )
  }
}