import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data'
import * as Utils  from '../utils'

class RecentChat extends Component {
  constructor(props) {
    super(props)

    this.color = Session.get("appColor")
    this.chat  = this.chat.bind(this);
  }

  chat(event) {
    event.preventDefault()
    Session.set('CURRENT_CHAT_ID', this.props.chat._id)
  }

  render() {
    const { otherUser, active } = this.props,
          chatStyle = active ? { color: "white", background: Utils.colorsArrayToString(this.color, 0.8)} : {};

    return (
      <div className="match-entry" style={chatStyle} onClick={this.chat}>
        <section className="_img">
          <img className="-circle" src={otherUser && otherUser.services.google.picture} />
        </section>
        <section className="_data">
          <article>
            <div>
              <div>{ otherUser &&  otherUser.profile.name }</div>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

export default withTracker((props) => {
  let userIds = props.chat.userIds.slice()
  const index = userIds.indexOf(Meteor.userId()),
        currentChatId = Session.get('CURRENT_CHAT_ID');

  userIds.splice(index, 1)
  const otherUserId = userIds[0]
  Meteor.subscribe('users.user', otherUserId)

  return {
    otherUser : Meteor.users.findOne(otherUserId),
    active    : currentChatId == props.chat._id  
  }
})(RecentChat)
