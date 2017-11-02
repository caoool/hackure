import React, { Component } from 'react'

import AppBar from './AppBar.jsx'
import Chats from './Chats.jsx'
import ChatRoom from './ChatRoom.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.app}>
        <AppBar />
        <div style={styles.main}>
          <Chats />
          <ChatRoom />
        </div>
      </div>
    )
  }
}

const styles = {
  app: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    bottom: '10px',
    left: '10px'
  },

  main: {
    display: 'flex',
    height: 'calc(100% - 100px)'
  }
}