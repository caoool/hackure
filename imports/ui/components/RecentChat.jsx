import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

class RecentChat extends Component {
  constructor(props) {
    super(props)
  }

  updateCurrentChatId(event) {
    event.preventDefault()
    Session.set('CURRENT_CHAT_ID', this.props.chat._id)
  }

  render() {
    return (
      <div style={styles.recentChat}>
        {this.props.otherUser && (
          <p>{this.props.otherUser.profile.name}</p>
        )}
        <button onClick={this.updateCurrentChatId.bind(this)}>Chat</button>
      </div>
    )
  }
}

export default createContainer((props) => {
  let userIds = props.chat.userIds.slice()
  const index = userIds.indexOf(Meteor.userId())
  userIds.splice(index, 1)
  const otherUserId = userIds[0]
  Meteor.subscribe('users.user', otherUserId)

  return {
    otherUser: Meteor.users.findOne(otherUserId)
  }
}, RecentChat)

const styles = {
  recentChat: {
    border: 'solid 2px green'
  }
}