import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { MessageSquare, User, HelpCircle, LogOut, LogIn } from 'react-feather';
import * as Utils from '../utils'

// import SearchBar from './SearchBar.jsx'
import LoginMenu from './LoginMenu.jsx'
import Logo from './Logo.jsx'

class AppBar extends Component {
  render() {
    const { currentUser } = this.props,
          hideIfLoggedOut = currentUser ? {} : { display: 'none' };

    return (
      <header className="navbar">
        <section className="_brand">
          <a>
            <Logo />
          </a>
        </section>
        <section className="_icons">
          <a style={hideIfLoggedOut} className="tooltip -bottom" data-tooltip="Chat"><MessageSquare color="white" /></a>
          <a style={hideIfLoggedOut} className="tooltip -bottom" data-tooltip="Profile"><User color="white" /></a>
          <a className="tooltip -bottom" data-tooltip="What is This?"><HelpCircle color="white" /></a>
          <LoginMenu context="menu" />
        </section> 
      </header>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  }
})(AppBar)