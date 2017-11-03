import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { MessageSquare, User, HelpCircle } from 'react-feather';
import * as Utils from '../utils'

// import SearchBar from './SearchBar.jsx'
// import LoginMenu from './LoginMenu.jsx'
import Logo from './Logo.jsx'

class AppBar extends Component {
  renderStyles() {
    const { appColor } = this.props
    return {
      background: appColor
    }
  }

  render() {
    return (
      <header className="navbar" style={this.renderStyles()}>
        <section className="_brand">
          <a>
            <Logo />
          </a>
        </section>
        <section className="_icons">
          <MessageSquare color="white" />
          <User color="white" />
          <HelpCircle color="white" />
        </section>
      </header>
    )
  }
}

export default withTracker(() => {
  return {
    appColor: Utils.colorsArrayToString(Session.get('appColor'), 1)
  }
})(AppBar)