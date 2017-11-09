import React, { Component } from 'react'
import { Meteor }  from 'meteor/meteor'
import * as Utils  from '../utils'
import moment from 'moment'

export default class Query extends Component {
  render() {
    const { text, createdAt } = this.props
    return (
      <li className="query">
        <sub>{ moment(createdAt).format("M/D h:mm a")  }</sub>
        <div>{ text }</div>
      </li>
    ) 
  }
}