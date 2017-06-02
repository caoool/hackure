import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration'

import '/imports/startup/server/register_api'

Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({ service: 'google' })
  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '652711280362-g75c2ts14birigjmk0a9jed7bfjnnfsn.apps.googleusercontent.com',
    secret: 'htHYA4Kl6XGcbYsYtL2gz_4J'
  })
});
