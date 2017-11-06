import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import MatchResults from './MatchResults.jsx'
import RecentChats from './RecentChats.jsx'
import { Star, Inbox, Search } from 'react-feather';
import { CHAT_SIDEBAR_MODES } from '../constants'

export default class ChatSidebar extends Component {
  constructor(props) {
    super(props)

    this.switchChatPanel = this.switchChatPanel.bind(this)

    this.state = {
      option: CHAT_SIDEBAR_MODES.matches
    }
  }

  switchChatPanel(mode) {
    this.setState({ option: mode })
  }

  renderSidebarMode() {
    switch(this.state.option) {
      case CHAT_SIDEBAR_MODES.matches:
        return <MatchResults />
      default:
        return <RecentChats />
    }
  }

  renderSidebarMenu() {
    return (
      <div className="_menu columns -gapless -oneline">
        <button
          className="column col-4" 
          onClick      = { () => this.switchChatPanel(CHAT_SIDEBAR_MODES.matches) }
        >
          <header><Star /></header>
          <footer>Matches</footer>
        </button>
        <button
          className="column col-4" 
          onClick = { () => this.switchChatPanel(CHAT_SIDEBAR_MODES.recent) }
        >
          <header><Inbox /></header>
          <footer>Recent</footer>
        </button>
        <button
          className="column col-4"
        >
          <header><Search /></header>
          <footer>Filter</footer>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="chat-sidebar">
        { this.renderSidebarMenu() }
        { this.renderSidebarMode() }
      </div>
    )
  }
}