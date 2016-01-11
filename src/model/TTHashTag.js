// TTHashTag.js

var Parse = require('parse/react-native');

var HashTag = Parse.Object.extend("HashTag");

exports.add = function(tag) {
  var hashTag = new HashTag();
  hashTag.save({
    hashTag: tag.toLowerCase()
  }, null, null);
};
