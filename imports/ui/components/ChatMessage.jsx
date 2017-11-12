import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import moment     from 'moment'
import * as Utils from '../utils'

export default class ChatMessage extends Component {
  constructor(props) {
    super(props)

    this.color = Utils.colorsArrayToString(Session.get('APP_COLOR'), 1);
  }

  render() {
    const { message, otherUser } = this.props,
          ownUserChat   = message.createdBy == Meteor.userId(),
          classNameMod  = `message ${ ownUserChat ? "-self" : "" }`,
          messageName   = ownUserChat ? Meteor.user().profile.name : otherUser.profile.name,
          ownNameStyles = ownUserChat ? { color: this.color } : {};

    return (
      <div className={classNameMod}>
        <header>
          <span className="_name" style={ownNameStyles}>{ messageName } </span> 
          <span className="_date">{ moment(message.createdAt).format("M/D h:mm a") }</span>
        </header>
        <section>
          { message.text }
        </section>
      </div>
    )
  }
}