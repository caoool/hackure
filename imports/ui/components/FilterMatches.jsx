import React, { Component } from 'react'
import { Search } from 'react-feather';
import { Meteor } from 'meteor/meteor'

export default class FilterMessages extends Component {
  render() {
    return (
      <div style={styles.messagesView}>
        <Search />
        <input type="text" />
      </div>
    )
  }
}
