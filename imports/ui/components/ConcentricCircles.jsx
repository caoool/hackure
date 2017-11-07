import React, { Component } from 'react'
import * as Utils  from '../utils'

const ConcentricCircles = ({ colorProp }) => {
  // Not using color currently. Opting for grayscale opacities in scss.
  const color = colorProp || Session.get("appColor");

  return (
    <figure className="concentric-circles">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </figure>
  )
}

export default ConcentricCircles;