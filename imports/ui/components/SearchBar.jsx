import React, { Component } from 'react'
import ReactDOM       from 'react-dom'
import { Meteor }     from 'meteor/meteor'
import { X }          from 'react-feather';
import { Queries }    from '../../api/queries.js'
import * as Utils     from '../utils'
import { ArrowRight } from 'react-feather';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.color = Utils.colorsArrayToString(Session.get("APP_COLOR"), 1)

    this.search         = this.search.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault()
      this.search(event)
    }
  }

  search(event) {
    const { redirect } = this.props;

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

    redirect();
  }

  renderPlaceholder() {
    const { context } = this.props
  }

  renderContextDependent() {
    const { context, cancel } = this.props;

    return context == "appbar" ?
      <a className="cancel" onClick={cancel}><X color="white" size={16} /></a> :
      <button onClick={this.search}><ArrowRight color={this.color} /></button>;
  }

  render() {
    const { context } = this.props,
          placeholder = context == "appbar" ? "Type a new search here..." : "I want to change the world";

    return (
      <div className="search-bar">
        <input
          type        = "text"
          ref         = "searchInput"
          placeholder = { placeholder }
          onKeyUp     = { this.handleKeyPress }
        />
        { this.renderContextDependent() }
      </div>
    )
  }
}