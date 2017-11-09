import React, { Component } from 'react'
import { withTracker }      from 'meteor/react-meteor-data'
import ConcentricCircles from '../components/ConcentricCircles'

import * as Utils from '../utils'

class ProfilePage extends Component {
  render() {
    const { appColor, currentUser } = this.props,
          title = currentUser ? <h1>Hello, { currentUser.profile.name } </h1> : ""

    return (
      <div className="container -page profile">
        <div className="_content">
        { title }
        </div>
        <ConcentricCircles />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    appColor    : Session.get('APP_COLOR'),
    currentUser : Meteor.user()
  }
})(ProfilePage);

