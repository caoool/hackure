import React, { Component } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import MessagingInterface from '../components/MessagingInterface'
import { Chats } from '../../api/chats.js'

import * as Utils from '../utils'

export default class ChatPage extends Component {
  render() {
    return (
      <div className="container -page chat">
        <ChatSidebar />
        <MessagingInterface />
      </div>
    );
  }
}

