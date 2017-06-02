import { Meteor } from 'meteor/meteor'

if (Meteor.isServer) {
  Meteor.publish('users.all', () => {
    return Meteor.users.find({}, { fields: {
      profile: 1,
      'services.google.picture': 1,
      'services.google.gender': 1
    }})
  })

  Meteor.publish('users.user', (user_id) => {
    return Meteor.users.find({_id: user_id}, { fields: {
      profile: 1,
      'services.google.picture': 1,
      'services.google.gender': 1
    }})
  })
}