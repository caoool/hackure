import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Meteor } from 'meteor/meteor'

import { Queries } from '../api/queries.js'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  search(event) {
    event.preventDefault()
    const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim()
    query = {
      text: text,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    }
    Meteor.call('queries.insert', query)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref='searchInput'
          placeholder='Type keywords to start'
        />
        <button
          onClick={this.search.bind(this)}>
          Match
        </button>
      </div>
    )
  }
}