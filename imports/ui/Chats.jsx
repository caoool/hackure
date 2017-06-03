import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'

import MatchResults from './MatchResults.jsx'
import RecentChats from './RecentChats.jsx'

export default class Chats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      option: 'Matches'
    }
  }

  switchChatPanel(event) {
    event.preventDefault()
    this.setState({option: event.target.innerText})
  }

  render() {
    return (
      <div style={styles.sideBar}>
        <h2>Chats</h2>
        <button onClick={this.switchChatPanel.bind(this)}> Matches </button>
        <button onClick={this.switchChatPanel.bind(this)}> Recent </button>
        {(this.state.option == 'Matches') ? (
          <MatchResults />
        ) : (
          <RecentChats />
        )}
      </div>
    )
  }
}

const styles = {
  sideBar: {
    overflowY: 'auto',
    bottom: '0',
    minWidth: '200px',
    border: '2px solid grey'
  }
}