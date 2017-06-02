import React, { Component } from 'react'

import SearchBar from './SearchBar.jsx'
import LoginMenu from './LoginMenu.jsx'

export default class AppBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.floatLeft}>
            <h1>Hackure</h1>
          </li>
          <li style={styles.floatLeft}>
            <SearchBar />
          </li>
          <li style={styles.floatRight}>
            <LoginMenu />
          </li>
        </ul>
      </div>
    )
  }
}

const styles = {
  nav: {
    height: '100px'
  },

  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    border: '2px solid grey'
  },

  floatLeft: {
    float: 'left',
    marginRight: '30px'
  },

  floatRight: {
    float: 'right'
  }
}