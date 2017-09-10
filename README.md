# hackure

## Useful links

to be added...

## Frameworks

### Back-end -> Meteor

[Meteor](https://www.meteor.com) is a NodeJS fullstack framework, [install here](https://www.meteor.com/install).

It's famous of its **reactive data** flow which does not follow the get post pattern, instead, the back-end **publishes** a dataset and font-end **subscribes** to it, and front-end will be **notified** if there is any changed made to the database (where the datasets are from).

I really suggest to go over a very basic [tutorial](https://www.meteor.com/tutorials/react/creating-an-app) provided by Meteor to have a better understanding of how it all works.

### Front-end -> React

Meteor has official support for React as its rendering engine (front-end), [guides can be found here](https://guide.meteor.com/react.html).

## Conventions

### Git

Please follow [this git model](http://nvie.com/posts/a-successful-git-branching-model/) when commiting or pulling, committing directly to a none master branch is fine (no need for pulling request).

### JS

Use any style as you prefer, as long as its well commented and consistent, worst case [this coding style](https://github.com/elierotenberg/coding-styles/blob/master/es6.md), except semicolumns are optional. (I came from coffeescript, I hate ;;;)
 
## Project Hierarchy

Meteor has some special named folder convention:

* client -> anything under client will run only on client
* server -> anything under server will run only on server
* import -> anything inside this folder will not loal initially unless you import in code manually, and anything inside this folder will not automatically load anything (libraries). Pretty much everything will be under this folder now, since meteor relase this update a couple of versions ago
* startup -> will run once when server runs

cascading does not matter as long as the name matches, that means if you have /src/client, or /src/api/client and /client at the root, it will be all treated as if it is client only. Also, file names acts the same as folder names, means client.js will only run on client.

My personal taste is to put

```
/root
    /import
        /models
            /model
                /model.js
                /methods.js
                /server
                    /publications.js
                    /server-methods.js
        /server
            /startup.js
        /client
            /src
                /views
                /components
                /scenes
        /utils
```

## Model

Models can be found in /imports/api folder, each file contains a model according to file name.

### users

users is a predefined model handled by meteor, by calling ```Meteor.user()``` you get the current logged in user, or null if the user hasn't login.

Here are a few entries that we need to look at

entry | role
----- | ----
_id | unique user id, very important, every searching in depending on this
profile: services: google: name | user's name that return by google oauth login and saved to db by meteor
profile : services: google: picture (JSON format) | same as above (URL)
profile : services: google: gender (JSON format) | same as above

If we use facebook login or other 3rd party oauth logins, tokens and other info will be simply stored in profile: services: [whatever]

### queries

query is used to store user's searched text for matching purpose

entry | role
----- | ----
text | search text
createdBy | user unique id
createdAt | time (will not update)

### matches

matches is a temperory model that stores the calculated matching list and flushed after another search query comes in.

entry | role
----- | ----
score | highest is the most similar
query | based on user's query
createdBy | user unique id
createdAt | time (will not update)
user | the matching user found 

### chats

chats simply stores and indicates that the two user has a chat, its _id is used to define the chat room and fetch all messages.

entry | role
----- | ----
userIds | array of users' _id s
query | based on user's query
createdBy | user unique id
createdAt | time (will not update)

### messages

messages send by all users, distinguished by chatId from above and createdBy indicates whoever sends it.

entry | role
----- | ----
chatId | where this message belones
text | content
createdBy | user unique id, who sends it
createdAt | time (will not update)

## API

Currently all APIs can be found right inside every model, under ```Meteor.methods({})```

Detailed API description and usages will be updated later, here just a simple list of all apis

name | arguments | description
---- | --------- | --------
queries.insert | query | user input a query
queries.match | query | generate a matching ranked list in mongodb (need to subscribe to matches.user)
matches.user | uuid | Matches.find({createdBy: <uuid>})
chats.insert | chat | chat is an object {userIds: [], createdAt: date, createdBy: uuid}
chats.exist | userIds | given an array with two user ids, check if they chatted before
messages.insert | message | message is an object {chatId: chat's uid, text: message content, createdAt: date, createdBy: uuid}

## Publications

Publications are used to subscribe data, in meteor-react we need to subscribe to a dataset to fully utilize its two way bonding reactivity.

Same here is just a simple list, details will be filled out later

name | arguments | function
---- | --------- | --------
users.all | - | Meteor.users.find({})
users.user | uuid | Meteor.users.find({_id: <uuid>})
matches.user | uuid | Matches.find({createdBy: <uuid>})
chats.user | uuid | Chats.find({userIds: <uuid>})
chats.chat_id | chat's uid | Chats.find({_id: <chat_id>})
messages.chat | chat's uid | Messages.find({chatId: <chat_id>})
