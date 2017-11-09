import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor }   from 'meteor/meteor';
import { Session }  from 'meteor/session';
import  Utils       from '../utils'
import HomePage     from '../../ui/pages/HomePage.jsx';
import ChatPage     from '../../ui/pages/ChatPage.jsx';
import AboutPage    from '../../ui/pages/AboutPage.jsx';
import ProfilePage  from '../../ui/pages/ProfilePage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AppBar       from '../components/AppBar.jsx';
import { withTracker }      from 'meteor/react-meteor-data'
import { NOTIFICATION_TYPES } from '../constants'
import { Notification }  from 'react-notification'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notificationActive  : false,
      notificationMessage : ""
    }

    this.addNotification     = this.addNotification.bind(this)
    this.dismissNotification = this.dismissNotification.bind(this)

    Session.set('APP_COLOR', Utils.randomColor())
    Session.set('APP_ANIMAL', Utils.randomAnimal())
  }

  componentWillReceiveProps(oldprops) {
    const { loggedIn } = this.props
    if (loggedIn != oldprops.loggedIn) {
      this.addNotification(loggedIn ? NOTIFICATION_TYPES.logout : NOTIFICATION_TYPES.login)
    }
  }

  addNotification(type) {
    this.setState({
      notificationActive  : true,
      notificationMessage : type.message
    })
  }

  dismissNotification() {
    this.setState({
      notificationActive  : false,
      notificationMessage : "",
    })
  }

  renderAppStyles() {
    return {
      background: Utils.colorsArrayToString(Session.get('APP_COLOR'), 1)
    }
  }

  renderNotifications() {
    return (
      <Notification
        isActive     = { this.state.notificationActive }
        message      = { this.state.notificationMessage }
        dismissAfter = { 3000 }
        onDismiss    = { this.dismissNotification }
        onClick      = { this.dismissNotification }
      />
    )
  }

  render() {
    return (
      <Router>
        <div className="app" style={this.renderAppStyles()}>
          { this.renderNotifications() }
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
    loggedIn : Meteor.userId() ? true : false
  }
})(App);