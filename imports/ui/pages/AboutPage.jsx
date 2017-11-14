import React, { Component } from 'react'
import ConcentricCircles from '../components/ConcentricCircles'

export default class AboutPage extends Component {
  render() {
    return (
      <div className="container -page about">
        <div className="_content container -large">
          <h1>So What is Trybe?</h1> 
          <p>
            Trybe is kind of like magic. You simply tell it what you want to do and it will connect you to the people who want to make that happen. It's that easy. Search anything: "I want to build a fantasy basketball app" "I want to cure cancer" "I want to learn how to code" and we will help you find a Trybe of people looking to do the same! We all know that birds of a feather flock together - it's time that humans start doing the same in a productive way. Together everyone achieves more, there's no "I" in team, and that's why there's no "I" in TRYBE. At this point, I'm just rambling, so stop reading and go meet some cool people and doing some cool shit!
          </p>
        </div>
        <ConcentricCircles />
      </div>
    );
  }
}

