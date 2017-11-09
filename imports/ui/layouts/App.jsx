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

export default class App extends Component {
  constructor(props) {
    super(props)

    Session.set('APP_COLOR', Utils.randomColor())
    Session.set('APP_ANIMAL', Utils.randomAnimal())
  }

  renderAppStyles() {
    return {
      background: Utils.colorsArrayToString(Session.get('APP_COLOR'), 1)
    }
  }

  render() {
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
