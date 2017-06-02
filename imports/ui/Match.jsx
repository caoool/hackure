import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Chats } from '../api/chats.js'

export default class Match extends Component {
  constructor(props) {
    super(props)
  }

  chat(event) {
    event.preventDefault()
    const chat = {
      users: [
        this.props.user._id,
        Meteor.userId()
      ],
      createdAt: new Date(),
      createdBy: Meteor.userId()
    }
    Meteor.call('chats.insert', chat, (error, result) => {
      Session.set('CURRENT_CHAT_ID', result)
    })
  }

  render() {
    return (
      <div>
        <p>{this.props.user.profile.name}</p>
        <button onClick={this.chat.bind(this)}>Chat</button>
      </div>
    )
  }
}