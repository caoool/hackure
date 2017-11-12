import React, { Component } from 'react'
import { withRouter }  from 'react-router'
import { Link }        from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data'
import { MessageSquare, User, HelpCircle, Search } from 'react-feather';
import * as Utils from '../utils'
import SearchBar  from './SearchBar.jsx'
import LoginMenu  from './LoginMenu.jsx'
import Logo       from './Logo.jsx'
import AppBarItem from './AppBarItem.jsx'

class AppBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchOpen: false
    }
  }

  setSearchOpen(val) {
    this.setState({ searchOpen: val });
  }

  redirectToChatPage() {
    const { history, location } = this.props
    if (location.pathname != "/chat") {
      history.push("/chat");
    } 
  }

  renderSearchComponent() {
    const { loggedIn }   = this.props,
          { searchOpen } = this.state;

    return searchOpen ? 
      <SearchBar 
        context  = "appbar" 
        cancel   = { () => this.setSearchOpen(false) }
        redirect = { () => this.redirectToChatPage() }
      /> : 
      <AppBarItem 
        Icon    = { Search } 
        action  = { () => this.setSearchOpen(true) } 
        show    = { loggedIn }
        tooltip = "New Search" 
      /> 
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <header className="app-bar">
        <section className="_brand">
          <Link to="/">
            <Logo />
          </Link>
        </section>
        <section className="_icons">
          { this.renderSearchComponent() }
          <AppBarItem 
            Icon    = { MessageSquare } 
            link    = "/chat" 
            show    = { loggedIn } 
            tooltip = "Chat" 
          /> 
          <AppBarItem 
            Icon    = { User } 
            link    = "/profile" 
            show    = { loggedIn } 
            tooltip = "Profile" 
          /> 
          <AppBarItem 
            Icon    = { HelpCircle } 
            link    = "/about" 
            show    = { true } 
            tooltip = "What is This?" 
          /> 
          <LoginMenu context="menu" />
        </section> 
      </header>
    )
  }
}

export default withRouter(withTracker(() => {
  return {
    loggedIn: Meteor.userId() ? true : false
  }
})(AppBar));