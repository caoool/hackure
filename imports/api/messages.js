import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Messages = new Mongo.Collection('messages')

if (Meteor.isServer) {
  Meteor.publish('messages.chat', (chatId) => {
    return Messages.find({
      chatId: chatId
    })
  })
}

Meteor.methods({
  'messages.insert'(message) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Messages.insert({
      chatId: message.chatId,
      text: message.text,
      createdAt: message.createdAt,
      createdBy: message.createdBy
    })
  }
})