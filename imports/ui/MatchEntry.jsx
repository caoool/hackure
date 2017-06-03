import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export default class MatchEntry extends Component {
  constructor(props) {
    super(props)
  }

  chat(event) {
    event.preventDefault()

    const userIds = [
      this.props.match.user._id,
      Meteor.userId()
    ]
    Meteor.call('chats.exist', userIds, (error, result) => {
      if (result) {
        Session.set('CURRENT_CHAT_ID', result._id)
      } else {
        const chat = {
          users: userIds,
          createdAt: new Date(),
          createdBy: Meteor.userId()
        }
        Meteor.call('chats.insert', chat, (error, result) => {
          Session.set('CURRENT_CHAT_ID', result)
        })
      }
    })
  }

  render() {
    return (
      <div style={styles.match}>
        <h3 style={styles.score}>SCORE: {this.props.match.score}</h3>
        <h3>{this.props.match.user.profile.name}</h3>
        <p>Based on query: {this.props.match.query.text}</p>
        <p>Searched at: {this.props.match.query.createdAt.toString()}</p>
        <button onClick={this.chat.bind(this)}>Chat</button>
      </div>
    )
  }
}

const styles = {
  match: {
    border: 'solid 2px green'
  },

  score: {
    color: 'red'
  }
}