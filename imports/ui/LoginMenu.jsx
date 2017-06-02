import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

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

  render() {
    const toRender = this.props.currentUser ? (
      <div>
        <span>Welcome back: {this.props.currentUser.profile.name}</span>
        <button onClick={this.logout.bind(this)}>
          Logout
        </button>
      </div>
    ) : (
      <div>
        <button onClick={this.loginWithGoogle.bind(this)}>
          Login With Google
        </button>
      </div>
    )

    return toRender
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  }
}, LoginMenu)

