import React, { Component } from 'react'
import { withTracker }      from 'meteor/react-meteor-data'

import ConcentricCircles from '../components/ConcentricCircles'
import SearchBar         from '../components/SearchBar'
import LoginMenu         from '../components/LoginMenu'

import * as Utils from '../utils'

class HomePage extends Component {
  renderAnimalBackground() {
    const { appColor, appAnimal } = this.props,
          styles = {
            figure: {
              backgroundColor: Utils.colorsArrayToString(appColor, 1),
              backgroundImage: `url(/images/animals/${appAnimal}.png)`
            }
          }   
    return (
      <figure className="animal-background" style={ styles.figure }></figure>
    )  
  }
 
  renderLoginState() {
    const { currentUser, appColor } = this.props,
          loginstate = currentUser ? 
              <SearchBar appColor={appColor} redirect={() => this.redirectToChatPage() }/> :
              <LoginMenu buttonColor={appColor} />
    
    return loginstate
  }

  redirectToChatPage() {
    const { history } = this.props
    history.push("/chat");
  }

  render() {
    const { appColor } = this.props

    return (
      <div className="container -page home">
        <div className="_content">
          <div className="container _callout">
            <span className="-weight-1">Find Your Own</span> 
            <br /> 
            <span className="-weight-5">Species.</span>
          </div>
          { this.renderLoginState() }
        </div>
        { this.renderAnimalBackground() }
        <ConcentricCircles />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    appColor    : Session.get('appColor'),
    appAnimal   : Session.get('appAnimal'),
    currentUser : Meteor.user()
  }
})(HomePage);

