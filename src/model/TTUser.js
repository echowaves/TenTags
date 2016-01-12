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




exports.searchUsersWithMatchingTagsCloseBy = function(user) {
  var subQueries = [];
  var index;
  var TAGS = user.get("hashTags");
  for	(index = 0; index < TAGS.length; index++) {
    console.log("looking for tags: " + TAGS[index]);
      var subQuery = new Parse.Query(User).equalTo("hashTags", TAGS[index]);
      subQueries.push(subQuery);
  }

  // User's location
  var userGeoPoint = user.get("location");
  // Create a query for places
  var mainQuery = Parse.Query.or.apply(Parse.Query, subQueries)
  .near("location", userGeoPoint);


  // new Parse.Query(User).near("location", userGeoPoint);
  // .or(subQueries);

  // Limit what could be a lot of points.
  // mainQuery.limit = 100

  // Final list of objects
  return mainQuery.find();
}
