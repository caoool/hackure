import React, { Component } from 'react'
import * as Utils  from '../utils'

const ConcentricCircles = ({ appColor, mode }) => {
  return (
    <figure className="concentric-circles">
      <div style={{ background: Utils.lightenDarkenColor(appColor, -25) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(appColor, -20) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(appColor, -10) }}></div>
      <div style={{ background: Utils.lightenDarkenColor(appColor, -5) }}></div>
    </figure>
  )
}

export default ConcentricCircles;