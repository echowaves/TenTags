// TTMessage.js

var Parse = require('parse/react-native');

var Message = Parse.Object.extend("Message");

module.exports = {
  addMessage: function(user, currentUser, msg) {
    var message = new Message();
    message.addUnique("participants", user.id);
    message.addUnique("participants", currentUser.id);

    message.set('sender', currentUser.id);
    message.set('message', msg['text']);

    var promise = new Parse.Promise();

    message.save().then(function (user) {
      promise.resolve();
    }, function (error) {
      promise.reject(error);
    });

    return promise;
  },
  getMessages: function(user, currentUser) {
    var Message = Parse.Object.extend("Message");
    var promise = new Parse.Promise();

    var query = new Parse.Query(Message);
    query.containsAll("participants", [user.id, currentUser.id]).descending("createdAt");
    query.find({
      success: function(results) {
// alert("found " + results.length + " results");
        promise.resolve(results);
      },
      error: function(error) {
        promise.reject(error);
      }
    });
    return promise;
  },

  generateChannelName: function(user, currentUser) {
    if(user.id.toString() > currentUser.id.toString()) {
      return "channel-" + currentUser.id + "-" + user.id;
    } else {
      return "channel-" + user.id + "-" + currentUser.id;
    }
  }
};
