// TTUser.js

var Parse = require('parse/react-native');

var User = Parse.Object.extend("User");

exports.addTag = function(user, tag) {
  user.addUnique("hashTags", tag.toLowerCase());

  user.save(null,
    {
      success: function() {
        var ttHashTag = require('./TTHashTag');
        ttHashTag.add(tag);
      },
      null}
    );
  };
