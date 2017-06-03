import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

import { Matches } from '../api/matches.js'
import TextProcessor from '../lib/TextProcessor.js'

export const Queries = new Mongo.Collection('queries')

Meteor.methods({
  'queries.insert'(query) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // if (Queries.find({createdBy: this.userId, text: query.text})) {return}
    Queries.insert({
      text: query.text,
      createdBy: query.createdBy,
      createdAt: query.createdAt
    })
  },

  'queries.match'(query) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Matches.remove({createdBy: this.userId})
    const queries = Queries.find().fetch()
    for (let target of queries) {
      if (target.createdBy == this.userId) { continue }
      let match = {
        score: TextProcessor.compareTwoStrings(query.text, target.text),
        query: target,
        createdBy: this.userId,
        createdAt: new Date(),
        user: Meteor.users.findOne(target.createdBy, {
          fields: {
            profile: 1,
            'services.google.picture': 1,
            'services.google.gender': 1
        }})
      }
      Matches.insert(match)
    }
  }
})