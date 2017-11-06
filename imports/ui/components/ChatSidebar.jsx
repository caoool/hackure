import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import MatchResults from './MatchResults.jsx'
import RecentChats from './RecentChats.jsx'
import { Star, Mail, Search } from 'react-feather';
import { CHAT_SIDEBAR_MODES } from '../constants'
import * as Utils  from '../utils'

export default class ChatSidebar extends Component {
  constructor(props) {
    super(props)

    this.switchChatPanel = this.switchChatPanel.bind(this)

    this.state = {
      mode: CHAT_SIDEBAR_MODES.matches
    }
  }

  switchChatPanel(mode) {
    this.setState({ mode: mode })
  }

  renderSidebarMode() {
    switch(this.state.mode) {
      case CHAT_SIDEBAR_MODES.matches:
        return <MatchResults />
      default:
        return <RecentChats />
    }
  }

  activeIconStyles(mode) {
    return mode == this.state.mode ? { color: Utils.colorsArrayToString(Session.get('appColor'), 1) } : {}
  }

  renderSidebarMenu() {
    return (
      <div className="_menu columns -gapless -oneline">
        <button
          className ="column col-4" 
          onClick   = { () => this.switchChatPanel(CHAT_SIDEBAR_MODES.matches) }
          style     = {this.activeIconStyles(CHAT_SIDEBAR_MODES.matches)}
        >
          <header><Star /></header>
          <footer>Matches</footer>
        </button>
        <button
          className ="column col-4" 
          onClick   = { () => this.switchChatPanel(CHAT_SIDEBAR_MODES.recent) }
          style     = {this.activeIconStyles(CHAT_SIDEBAR_MODES.recent)}
        >
          <header><Mail /></header>
          <footer>Recent</footer>
        </button>
        <button
          className ="column col-4"
          style     = {this.activeIconStyles(CHAT_SIDEBAR_MODES.filter)}
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