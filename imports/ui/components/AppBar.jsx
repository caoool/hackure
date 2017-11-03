import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

// import SearchBar from './SearchBar.jsx'
// import LoginMenu from './LoginMenu.jsx'
import Logo from './Logo.jsx'

class AppBar extends Component {
  constructor(props) {
    super(props)
  }

  renderStyles() {
    const { primaryColor } = this.props
    return {
      background: `rgba(${primaryColor[0]},${primaryColor[1]},${primaryColor[2]},1)`
    }
  }

  render() {
    return (
      <header className="navbar" style={this.renderStyles()}>
        <a className="navbar-brand"><Logo /></a>
      </header>
    )
  }
}

export default withTracker(() => {
  return {
    primaryColor: Session.get('primaryColor')
  }
})(AppBar)