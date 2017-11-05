import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import * as Utils  from '../utils'

import GoogleLogo from './GoogleLogo'

class LoginMenu extends Component {
  constructor(props) {
    super(props)
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
    return (
      <div>
        <span>Welcome back: {this.props.currentUser.profile.name}</span>
        <button onClick={this.logout.bind(this)}>
          Logout
        </button>
      </div>
    )
  }

  loggedOutState() {
    const { buttonColor } = this.props;

    return (
      <div>
        <button className=" login-button" onClick={this.loginWithGoogle.bind(this)}>
          <GoogleLogo fill={buttonColor} /> Login With Google
        </button>
      </div>    
    )
  }

  render() {
    const { currentUser } = this.props;
    
    return currentUser ? this.loggedInState() : this.loggedOutState();
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  }
})(LoginMenu)

