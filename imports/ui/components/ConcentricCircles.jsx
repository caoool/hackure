import React, { Component } from 'react'
import * as Utils  from '../utils'

const ConcentricCircles = ({ colorProp }) => {
  const color = colorProp || Session.get("appColor");

  return (
    <figure className="concentric-circles">
      <div style={{ background: Utils.lightenDarkenColor(color, -25) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(color, -20) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(color, -10) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(color, -5) }}></div>
    </figure>
  )
}

export default ConcentricCircles;