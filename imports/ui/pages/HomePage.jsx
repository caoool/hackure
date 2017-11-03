import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import * as Utils from '../utils'

class HomePage extends Component {
  renderPageStyles() {
    const { appColor } = this.props
    return {
      background: appColor
    }
  }

  render() {
    const { appColor, appAnimal } = this.props
    const styles = {
      figure: {
        backgroundColor: appColor,
        backgroundImage: `url(/images/animals/${appAnimal}.png)`
      }
    }  
    return (
      <div className="page home" style={this.renderPageStyles()}>
         <figure style={ styles.figure }></figure>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    appColor: Utils.colorsArrayToString(Session.get('appColor'), 1),
    appAnimal: Session.get('appAnimal')
  }
})(HomePage);

