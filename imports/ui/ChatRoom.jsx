import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

import { Chats } from '../api/chats.js'
import { Messages } from '../api/messages.js'

import ChatMessages from './ChatMessages.jsx'

class ChatRoom extends Component {
  constructor(props) {
    super(props)
  }

  sendMessage(event) {
    event.preventDefault()
    const text = this.refs.messageInput.value.trim()
    const message = {
      chatId: this.props.chat._id,
      text: text,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    }
    Meteor.call('messages.insert', message)
    this.refs.messageInput.value = ''
  }

  render() {
    return (
      <div style={styles.chatRoomView}>
        {this.props.otherUser ? (
          <div>
            <h2>
              Chatting with: {this.props.otherUser.profile.name}
            </h2>
            <ChatMessages
              messages={this.props.messages}
              otherUser={this.props.otherUser}
            />
            <div style={styles.inputBox}>
              <textarea
                ref='messageInput'
                placeholder='Please type your message here.'
              />
              <button onClick={this.sendMessage.bind(this)}>Send</button>
            </div>
          </div>
        ) : (
          <h2>Chat Room</h2>
        )}
      </div>
    )
  }
}

export default createContainer((props) => {
  const currentChatId = Session.get('CURRENT_CHAT_ID')
  Meteor.subscribe('chats.chat_id', currentChatId)
  Meteor.subscribe('messages.chat', currentChatId)

  const chat = Chats.findOne()
  let userIds = []
  let otherUserId = ''
  if (chat) {
    const userIds = chat.userIds
    const index = userIds.indexOf(Meteor.userId())
    userIds.splice(index, 1)
    otherUserId = userIds[0]
  }
  Meteor.subscribe('users.user', otherUserId)
  otherUser = Meteor.users.findOne(otherUserId)

  return {
    chat: Chats.findOne(),
    otherUser: otherUser,
    messages: Messages.find().fetch()
  }
}, ChatRoom)


const styles = {
  chatRoomView: {
    position: 'relative',
    overflowY: 'auto',
    height: '100%',
    width: '100%',
    border: 'solid 2px grey'
  },

  inputBox: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '50px',
    border: 'solid 2px blue'
  }
}