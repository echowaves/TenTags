// TTMessage.js

var Parse = require('parse/react-native');

var Message = Parse.Object.extend("Message");

module.exports = {
  addMessage: function(user, currentUser, msg, rowID) {
    var message = new Message();
    message.addUnique("participants", user.id);
    message.addUnique("participants", currentUser.id);

    message.set('sender', currentUser.id);
    message.set('channel', this.generateChannelName(user, currentUser));
    message.set('message', msg['text']);
    message.set('rodID', rowID);

    var promise = new Parse.Promise();

    message.save().then(function (user) {
      promise.resolve();
    }, function (error) {
      promise.reject(error.message);
    });

    return promise;
  },
  generateChannelName: function(user, currentUser) {
    if(user.id > currentUser.id) {
      return "channel-" + currentUser.id + "-" + user.id;
    }
    return "channel-" + user.id + "-" + currentUser.id;
  }
};
