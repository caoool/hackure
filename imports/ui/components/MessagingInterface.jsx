import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data'

import { Chats } from '../../api/chats.js'
import { Messages } from '../../api/messages.js'
import { Matches } from '../../api/matches.js'

import ChatMessages from './ChatMessages.jsx'

class MessagingInterface extends Component {
  constructor(props) {
    super(props)

    this.sendMessage    = this.sendMessage.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault()
      this.sendMessage(event)
    }
  }

  renderChatMessages() {
    const { otherUser, messages } = this.props
    console.log(messages);
    return (
      <div>
        <section className="_menu">
          { otherUser.profile.name }
        </section>
        <ChatMessages
          messages  = { messages }
          otherUser = { otherUser }
        />
        <section className="_composer">
          <form
            onSubmit = { this.sendMessage }
          >
            <input
              ref         = 'messageInput'
              placeholder = 'Type a message...'
              onKeyPress  = { this.handleKeyPress }
            />
          </form>
        </section>
      </div>
    )
  }

  renderPromptNoMatches() {
    return "You have not matched with anyone yet. Search for what you're interested in find matches!"
  }

  renderPromptWithMatches() {
    return "Select a match in the sidebar to start or continue a conversation!"
  }

  renderPrompt() {
    const { matches } = this.props
    return (
      <section className="chat-prompt"> 
        { matches.length ?
           this.renderPromptWithMatches() : 
           this.renderPromptNoMatches() 
        }
      </section>
    )
  }

  renderContext() {
    const { otherUser } = this.props
    return otherUser ? this.renderChatMessages() : this.renderPrompt();
  }

  render() {
    return (
      <div className="messaging-interface">
        { this.renderContext() }
      </div>
    )
  }
}

export default withTracker((props) => {
  const currentChatId = Session.get('CURRENT_CHAT_ID')
  Meteor.subscribe('chats.chat_id', currentChatId)
  Meteor.subscribe('messages.chat', currentChatId)
  Meteor.subscribe('matches.user', Meteor.userId())

  const chat = Chats.findOne()
  let userIds = []
  let otherUserId = ''
  if (chat) {
    const userIds = chat.userIds,
          index   = userIds.indexOf(Meteor.userId());

    userIds.splice(index, 1)
    otherUserId = userIds[0]
  }
  Meteor.subscribe('users.user', otherUserId)
  otherUser = Meteor.users.findOne(otherUserId)

  return {
    chat: Chats.findOne(),
    otherUser: otherUser,
    messages: Messages.find().fetch(),
    matches: Matches.find().fetch()
  }
})(MessagingInterface)
