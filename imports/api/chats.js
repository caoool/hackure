import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Chats = new Mongo.Collection('chats')

if (Meteor.isServer) {
  Meteor.publish('chats.user', (userId) => {
    return Chats.find({
      userIds: userId
    })
  })

  Meteor.publish('chats.chat_id', (chat_id) => {
    return Chats.find({
      _id: chat_id
    })
  })
}

Meteor.methods({
  'chats.insert'(chat) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    return Chats.insert({
      userIds: chat.users,
      createdAt: chat.createdAt,
      createdBy: chat.createdBy
    })
  },

  'chats.exist'(userIds) {
    chat = Chats.findOne({
      userIds: {
        $all: userIds
      }
    })
    return chat
  }
})