import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import MatchResults from './MatchResults.jsx'
import MatchesFilter from './MatchesFilter.jsx'
import RecentChats from './RecentChats.jsx'
import { Star, Mail, Search } from 'react-feather';
import { CHAT_SIDEBAR_MODES } from '../constants'
import * as Utils  from '../utils'

export default class ChatSidebar extends Component {
  constructor(props) {
    super(props)

    this.appColor            = Utils.colorsArrayToString(Session.get('appColor'), 1)
    this.switchChatPanel     = this.switchChatPanel.bind(this)
    this.cancelSidebarFilter = this.cancelSidebarFilter.bind(this)

    this.state = {
      mode: CHAT_SIDEBAR_MODES.matches
    }
  }

  switchChatPanel(mode) {
    this.setState({ mode: mode })
  }

  renderSidebarContent() {
    switch(this.state.mode) {
      case CHAT_SIDEBAR_MODES.recent:
        return <RecentChats /> 
      default:
        return <MatchResults />
    }
  }

  activeIconStyles(mode) {
    return mode == this.state.mode ? { color: this.appColor } : {}
  }

  cancelSidebarFilter() {
    this.switchChatPanel(CHAT_SIDEBAR_MODES.matches)
    Session.set("MATCHES_FILTER")
  }

  renderSidebarMenuFilter() {
    return <MatchesFilter cancel={this.cancelSidebarFilter} />
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
          onClick   = { () => this.switchChatPanel(CHAT_SIDEBAR_MODES.filter) }
          style     = {this.activeIconStyles(CHAT_SIDEBAR_MODES.filter)}
        >
          <header><Search /></header>
          <footer>Filter</footer>
        </button>
      </div>
    )
  }

  render() {
    const { mode } = this.state

    return (
      <div className="chat-sidebar">
        { mode == CHAT_SIDEBAR_MODES.filter ? this.renderSidebarMenuFilter() : this.renderSidebarMenu() }
        { this.renderSidebarContent() }
      </div>
    )
  }
}