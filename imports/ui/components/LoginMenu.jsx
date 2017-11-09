import React, { Component } from 'react'
import { Meteor }        from 'meteor/meteor'
import { withTracker }   from 'meteor/react-meteor-data'
import GoogleLogo        from './GoogleLogo'
import { LogOut, LogIn } from 'react-feather'
import * as Utils        from '../utils'

class LoginMenu extends Component {
  constructor(props) {
    super(props)

    this.logout          = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  loginWithGoogle(event) {
    event.preventDefault()
    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        throw new Meteor.Error('Google login failed')
      } else {
        console.log('Google logged in')
      }
    })
  }

  logout(event) {
    event.preventDefault()
    Meteor.logout()
  }

  loggedInState() {
    const { context } = this.props

    return context == "menu" ? (
      <a 
        className    = "tooltip -bottom" 
        data-tooltip = "Log Out" 
        onClick      = { this.logout }
      >
        <LogOut color="white" />
      </a>
    ) : null;
  }

  loggedOutState() {
    const { buttonColor, context } = this.props,
          loggedOutState = context == "menu" ?
            <a 
              className    = "tooltip -bottom" 
              data-tooltip = "Log In" 
              onClick      = { this.loginWithGoogle }
            >
              <LogIn color="white" />
            </a> :
            <button className="login-button" onClick={this.loginWithGoogle}>
              <GoogleLogo fill={buttonColor} /> Login With Google
            </button>      

    return loggedOutState
  }

  render() {
    const { loggedIn, context } = this.props;
    
    return loggedIn ? 
      this.loggedInState() : 
      this.loggedOutState();
  }
}

export default withTracker(() => {
  return {
    loggedIn : Meteor.userId() ? true : false
  }
})(LoginMenu)

