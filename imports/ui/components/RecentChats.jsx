import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Chats } from '../../api/chats.js'

import RecentChat from './RecentChat.jsx'

class RecentChats extends Component {
  constructor(props) {
    super(props)
  }

  renderChats() {
    const { recentChats } = this.props
    return recentChats.map((chat) => (
      <RecentChat
        key  = { chat._id }
        chat = { chat }
      />
    ))
  }

  render() {
    return (
      <div>
        { this.renderChats() }
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('chats.user', Meteor.userId())
  
  return {
    recentChats: Chats.find().fetch()
  }
})(RecentChats)