import React, { Component } from 'react'
import { withTracker }      from 'meteor/react-meteor-data'

import ConcentricCircles from '../components/ConcentricCircles'
import Chats from '../components/Chats'
import ChatRoom from '../components/ChatRoom'

import * as Utils from '../utils'

class ChatPage extends Component {
  render() {
    const { appColor } = this.props

    return (
      <div className="container -page chat">
        <Chats />
        <ChatRoom />
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

