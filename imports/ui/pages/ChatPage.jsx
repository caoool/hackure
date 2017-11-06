import React, { Component } from 'react'
import { withTracker }      from 'meteor/react-meteor-data'

import ChatSidebar from '../components/ChatSidebar'
import MessagingInterface from '../components/MessagingInterface'

import * as Utils from '../utils'

class ChatPage extends Component {
  render() {
    const { appColor } = this.props

    return (
      <div className="container -page chat">
        <ChatSidebar />
        <MessagingInterface />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    appColor    : Session.get('appColor'),
    appAnimal   : Session.get('appAnimal'),
    currentUser : Meteor.user()
  }
})(ChatPage);

