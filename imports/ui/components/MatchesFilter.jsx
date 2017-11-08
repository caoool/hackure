import React, { Component } from 'react'
import { Search, X } from 'react-feather';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export default class MatchesFilter extends Component {
  constructor(props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.refs.matchesFilter.focus();
  }

  handleKeyPress() {
    Session.set("MATCHES_FILTER", this.refs.matchesFilter.value)
  }

  render() {
    const { cancel } = this.props
    return (
      <div className="_menu matches-filter">
        <input 
          type        = "text" 
          ref         = "matchesFilter"
          placeholder = "Type to filter matches..."
          onKeyUp     = { this.handleKeyPress }
        />
        <div className="_cancel">
          <X onClick={cancel} />
        </div>
      </div>
    )
  }
}
