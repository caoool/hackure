import React, { Component } from 'react'
import includes from 'lodash/includes'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Matches } from '../../api/matches.js'
import { Chats } from '../../api/chats.js'

import MatchEntry from './MatchEntry.jsx'
import * as Utils  from '../utils'

class MatchResults extends Component {
  constructor(props) {
    super(props)
  }

  filteredMatches() {
    const { matches, matchesFilter } = this.props 
    return matches.filter((match) => includes(Utils.cleanString(match.user.profile.name), Utils.cleanString(matchesFilter)))
  }

  renderMatches() {
    const { matches, matchesFilter } = this.props,
          matchesToRender = matchesFilter ? this.filteredMatches() : matches;

    return matchesToRender.map((match) => <MatchEntry key={match._id} match={match} />);
  }

  render() {
    return (
      <div>
        { this.renderMatches() }
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches.user', Meteor.userId())
  
  return {
    matches       : Matches.find({}, { sort: { score: -1 } }).fetch(),
    matchesFilter : Session.get('MATCHES_FILTER'),
  }
})(MatchResults)