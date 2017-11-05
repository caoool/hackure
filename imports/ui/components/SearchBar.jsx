import React, { Component } from 'react'
import ReactDOM             from 'react-dom'

import { Meteor }     from 'meteor/meteor'

import { Queries } from '../../api/queries.js'
import * as Utils  from '../utils'

import { ArrowRight } from 'react-feather';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  search(event) {
    event.preventDefault()

    const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim()
    if (!text) { 
      return 
    }

    query = {
      text: text,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    }

    Meteor.call('queries.match', query)
    Meteor.call('queries.insert', query)
  }

  render() {
    const { appColor } = this.props;
    const placeholder = `I want to change the world`;
    return (
      <div className="search-bar">
        <textarea
          type        = "text"
          ref         = "searchInput"
          placeholder = { placeholder }
        ></textarea>
        <button
          onClick = { this.search.bind(this) }
        >
          <ArrowRight color={Utils.colorsArrayToString(appColor, 1)} />
        </button>
      </div>
    )
  }
}