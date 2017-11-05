import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import  Utils from '../utils'
import AuthRoute from './AuthRoute.jsx'
import HomePage     from '../../ui/pages/HomePage.jsx';
import ChatPage     from '../../ui/pages/ChatPage.jsx';
import AboutPage    from '../../ui/pages/AboutPage.jsx';
import ProfilePage  from '../../ui/pages/ProfilePage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AppBar from '../components/AppBar.jsx';

class App extends Component {
  constructor(props) {
    super(props)

    Session.set('appColor', Utils.randomColor())
    Session.set('appAnimal', Utils.randomAnimal())
  }

  renderAppStyles() {
    return {
      background: Utils.colorsArrayToString(Session.get('appColor'), 1)
    }
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router>
        <div className="app" style={this.renderAppStyles()}>
          <AppBar />
          <main>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/chat" component={ChatPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Router> 
    )
  }
}

export default withTracker(() => {
  return {
    isLoggedIn : Meteor.user() ? true : false
  }
})(App);
