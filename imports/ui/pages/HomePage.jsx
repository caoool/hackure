import React, { Component } from 'react'
import { withTracker }      from 'meteor/react-meteor-data'

import ConcentricCircles from '../components/ConcentricCircles'
import SearchBar         from '../components/SearchBar'
import LoginMenu         from '../components/LoginMenu'

import * as Utils from '../utils'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.color  = Utils.colorsArrayToString(Session.get('APP_COLOR'), 1)
    this.animal = Session.get('APP_ANIMAL')
  }

  renderAnimalBackground() {
    const styles = {
      figure: {
        backgroundColor: this.color,
        backgroundImage: `url(/images/animals/${this.animal}.png)`
      }
    }   

    return (
      <figure className="animal-background" style={styles.figure}></figure>
    )  
  }
 
  renderLoginState() {
    const { currentUser } = this.props,
          loginstate = currentUser ? 
              <SearchBar redirect={ () => this.redirectToChatPage() }/> :
              <LoginMenu buttonColor={this.color} />
    
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
    currentUser : Meteor.user()
  }
})(HomePage);

