import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { Chats } from '../../api/chats.js'

import RecentChat from './RecentChat.jsx'

class RecentChats extends Component {
  constructor(props) {
    super(props)
  }

  renderChats() {
    return this.props.recentChats.map((chat) => (
      <RecentChat
        key={chat._id}
        chat={chat}
      />
    ))
  }

  render() {
    return (
      <div>
        <h2>Recent Chats</h2>
        {this.renderChats()}
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('chats.user', Meteor.userId())
  
  return {
    recentChats: Chats.find().fetch()
  }
}, RecentChats)