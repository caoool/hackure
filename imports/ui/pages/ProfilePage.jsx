import React, { Component } from 'react'
import { withTracker }   from 'meteor/react-meteor-data'
import ConcentricCircles from '../components/ConcentricCircles'
import Query             from '../components/Query'
import * as Utils        from '../utils'
import { Queries }       from '../../api/queries.js'

class ProfilePage extends Component {
  renderQueries() {
    const { queries } = this.props,
          queriesList = queries.map((query) => <Query text={query.text} />);

    if (queries.length) {
      return (
        <div className="queries">
          <header>Your Queries</header>
          <ul>{ queriesList }</ul>
        </div>
      )
    }
  }

  render() {
    const { currentUser } = this.props,
          title = currentUser ? <h1>Hello, { currentUser.profile.name } </h1> : ""

    return (
      <div className="container -page profile">
        <div className="_content">
          { title }
          { this.renderQueries() }
        </div>
        <ConcentricCircles />
      </div> 
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('queries.user', Meteor.userId())

  return {
    currentUser : Meteor.user(),
    queries     : Queries.find().fetch()
  }
})(ProfilePage);

