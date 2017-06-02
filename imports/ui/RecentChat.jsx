import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export default class RecentChat extends Component {
  constructor(props) {
    super(props)
  }

  updateCurrentChatId(event) {
    event.preventDefault()
    Session.set('CURRENT_CHAT_ID', this.props.chat._id)
  }

  render() {
    return (
      <div>
        <p>{this.props.chat.createdAt.toString()}</p>
        <button onClick={this.updateCurrentChatId.bind(this)}>Chat</button>
      </div>
    )
  }
}