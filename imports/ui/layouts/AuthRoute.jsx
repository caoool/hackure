import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, Redirect } from 'react-router-dom'

class AuthRoute extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    debugger;
    if (!Meteor.userId()) {
          debugger;

      // this.props.history.push('/moo');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!Meteor.userId()) {
          debugger;

      // this.props.history.push('/moo');
    }
  }

  render() {
    // const notLoggedInRedirect = { pathname: '/', state: { from: props.location } };
    return  <Route { ...this.props } component={ this.props.component } />
  }
}

export default withTracker(() => {
  return {
    loggedIn : Meteor.user() ? true : false
  }
})(AuthRoute);

// const AuthRoute = ({ component, ...props }) => {
//   if (isAuthenticated()) {
//     //If route is private, user proceeds, else route is public, redirect use to private root.
//     return isPrivate
//       ? <Route { ...props } component={ component } />
//       : <Redirect to={ PRIVATE_ROOT } />;
//   } else {
//     //If route is private, user is redirected to app's public root, else user proceeds.
//     return isPrivate
//       ? <Redirect to={ PUBLIC_ROOT } />
//       : <Route { ...props } component={ component } />;
//   }
// };

  // <Route {...rest} render={props => (
  //   props.currentUser ? (
  //     <Component {...props}/>
  //   ) : (
  //     <Redirect to={{
  //       pathname: '/',
  //       state: { from: props.location }
  //     }}/>
  //   )
  // )}/>