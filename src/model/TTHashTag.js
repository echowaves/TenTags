// TTHashTag.js

var Parse = require('parse/react-native');

var HashTag = Parse.Object.extend("HashTag");

module.exports = {
  add: function(tag) {
    var hashTag = new HashTag();
    hashTag.save({
      hashTag: tag.toLowerCase()
    }, null, null);
  },
  autoComplete: function(hashTag) {
    if(!hashTag || hashTag.length == 0) {
      var promise = new Parse.Promise();
      promise.resolve([]);
      return promise;
    }

    var searchText = hashTag.toLowerCase();

    var HashTag = Parse.Object.extend("HashTag");
    var query = new Parse.Query(HashTag);
    query.startsWith("hashTag", searchText);
    query.limit(5);
    // Final list of objects
    return query.find();
  }
};
