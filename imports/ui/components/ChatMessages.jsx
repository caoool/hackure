import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import { Messages } from '../../api/messages.js'

import ChatMessage from './ChatMessage.jsx'
import * as Utils  from '../utils'

export default class ChatMessages extends Component {
  constructor(props) {
    super(props)
  }

  renderMessages() {
    const { messages, otherUser } = this.props
    return messages.map((message) => (
      <ChatMessage
        key       = { message._id }
        message   = { message }
        otherUser = { otherUser }
      />
    ))
  }

  render() {
    return (
      <div>
        { this.renderMessages() }
      </div>
    )
  }
}