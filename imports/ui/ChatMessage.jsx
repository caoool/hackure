import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

export default class ChatMessage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.message}>
        {(this.props.message.createdBy == Meteor.userId()) ? (
          <p>{Meteor.user().profile.name} (self):</p>
        ) : (
          <p>{this.props.otherUser.profile.name}:</p>
        )}
        <p>{this.props.message.text}</p>
      </div>
    )
  }
}

const styles = {
  message: {
    border: 'solid 2px yellow'
  }
}