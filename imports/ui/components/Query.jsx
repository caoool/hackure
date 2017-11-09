import React, { Component } from 'react'
import { Meteor }  from 'meteor/meteor'
import * as Utils  from '../utils'

export default class Query extends Component {
  render() {
    const { text } = this.props
    return (
      <li className="query">{ text }</li>
    ) 
  }
}