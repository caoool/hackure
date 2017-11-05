import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { Matches } from '../../api/matches.js'

import MatchEntry from './MatchEntry.jsx'

class MatchResults extends Component {
  constructor(props) {
    super(props)
  }

  renderMatches() {
    return this.props.matches.map((match) => (
      <MatchEntry key={match._id} match={match}/>
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
  Meteor.subscribe('matches.user', Meteor.userId())
  
  return {
    matches: Matches.find({}, {sort: {score: -1}}).fetch()
  }
}, MatchResults)