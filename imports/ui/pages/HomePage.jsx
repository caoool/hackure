import React, { Component } from 'react';

export default class HomePage extends Component {
  renderStyles() {
    const { primaryColor } = this.props
    return {
      background: `rgba(${primaryColor[0]},${primaryColor[1]},${primaryColor[2]},1)`
    }
  }

  render() {
    return (
      <div className="page home" style={this.renderStyles()}>

      </div>
    );
  }
}
