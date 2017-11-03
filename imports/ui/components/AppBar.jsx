import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { MessageSquare, User, HelpCircle } from 'react-feather';
import * as Utils from '../utils'

// import SearchBar from './SearchBar.jsx'
// import LoginMenu from './LoginMenu.jsx'
import Logo from './Logo.jsx'

class AppBar extends Component {
  render() {
    return (
      <header className="navbar">
        <section className="_brand">
          <a>
            <Logo />
          </a>
        </section>
        <section className="_icons">
          <a><MessageSquare color="white" /></a>
          <a><User color="white" /></a>
          <a><HelpCircle color="white" /></a>
        </section>
      </header>
    )
  }
}

export default withTracker(() => {
  return {
  }
})(AppBar)