import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import { Messages } from '../../api/messages.js'

import ChatMessage from './ChatMessage.jsx'

export default class ChatMessages extends Component {
  constructor(props) {
    super(props)
  }

  renderMessagess() {
    return this.props.messages.map((message) => (
      <ChatMessage
        key={message._id}
        message={message}
        otherUser={this.props.otherUser}
      />
    ))
  }

  render() {
    return (
      <div style={styles.messagesView}>
        {this.renderMessagess()}
      </div>
    )
  }
}

const styles = {
  messagesView: {
    position: 'relative',
    width: '100%',
    height: 'calc(100%-50px)',
    overflowY: 'scroll',
  }
}