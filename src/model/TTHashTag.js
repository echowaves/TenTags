// TTHashTag.js

var Parse = require('parse/react-native');

var HashTag = Parse.Object.extend("HashTag");

exports.add = function(tag) {
  var hashTag = new HashTag();
  hashTag.save({
    hashTag: tag.toLowerCase()
  }, null, null);
};


exports.autoComplete = function(hashTag) {
  var searchText = hashTag.toLowerCase();

  var HashTag = Parse.Object.extend("HashTag");
  var query = new Parse.Query(HashTag);
  query.startsWith("hashTag", searchText);
  query.limit(5);
  // Final list of objects
  return query.find();
}
