import React, { Component } from 'react'

import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import moment from 'moment'
import * as Utils  from '../utils'

export default class MatchEntry extends Component {
  constructor(props) {
    super(props)

    this.appColor = Utils.colorsArrayToString(Session.get('appColor'), 0.8)
    this.chat = this.chat.bind(this)
  }

  chat(event) {
    event.preventDefault()

    const userIds = [
      this.props.match.user._id,
      Meteor.userId()
    ]
    Meteor.call('chats.exist', userIds, (error, result) => {
      if (result) {
        Session.set('CURRENT_CHAT_ID', result._id)
      } else {
        const chat = {
          users: userIds,
          createdAt: new Date(),
          createdBy: Meteor.userId()
        }
        Meteor.call('chats.insert', chat, (error, result) => {
          Session.set('CURRENT_CHAT_ID', result)
        })
      }
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className="match-entry" onClick={this.chat}>
        <section className="_img">
          <img className="-circle" src={match.user.services.google.picture} />
        </section>
        <section className="_data">
          <header>
            <div>{ Math.ceil(match.score * 100) }% match</div>
            <div>{ moment(match.query.createdAt).fromNow() }</div>
          </header>
          <article>
            <div>
              <div>{ match.user.profile.name }</div>
              <div className="_query">Because they searched: { match.query.text }</div>
            </div>
          </article>
        </section>
      </div>
    )
  }
}