import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Queries = new Mongo.Collection('queries')

Meteor.methods({
  'queries.insert'(query) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Queries.insert({
      query: query.text,
      createdBy: query.createdBy,
      createdAt: query.createdAt
    })
  }
})