import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Matches = new Mongo.Collection('matches')

if (Meteor.isServer) {
  Meteor.publish('matches.user', (userId) => {
    return Matches.find({
      createdBy: userId
    })
  })
}