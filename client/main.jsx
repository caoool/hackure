import { Meteor } from 'meteor/meteor'

import React, { Component } from 'react'
import { render } from 'react-dom'

import AppContainer from '../imports/ui/containers/AppContainer.jsx'

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('root'))
})
