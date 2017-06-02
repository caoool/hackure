import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Match from './Match.jsx'

class Matches extends Component {
  constructor(props) {
    super(props)
  }

  renderMatches() {
    return this.props.users.map((user) => (
      <Match key={user._id} user={user}/>
    ))
  }

  render() {
    return (
      <div>
        <h2>Matches</h2>
        {this.renderMatches()}
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('users.all')
  
  return {
    users: Meteor.users.find().fetch()
  }
}, Matches)