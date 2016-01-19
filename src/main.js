var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var LayerAPI = require('layer-api');

var {
  StyleSheet,
  Navigator
} = React;

var UsersList = require('./UsersList');
var TagsList = require('./TagsList');
var AddTags = require('./AddTags');
var ConvosList = require('./ConvosList');
var Convo = require('./Convo');

var ROUTES = {
  userslist: UsersList,
  tagslist: TagsList,
  addtags: AddTags,
  convoslist: ConvosList,
  convo: Convo,
};

var globalStyles = require('./GlobalStyles');


module.exports = React.createClass({
  componentWillMount: function() {
    //prod
    // Parse.initialize("zoYLGIcwju9NnQJxX6Kg4zV839tdwHCc2qNWKQGu", "DeTVIq6dl8x2hVynylVJneaDcvoRZ9vb3SOF04TW");
    //dev
    Parse.initialize("C0caJoLjtwhdtE3tXywMPzragKn7NxwPze0iZEIl", "cvmyxydA8IWtHRASJadWeFKNtM41VsvmObfsvgKi");

    // Initialize by providing your Layer credentials
    // var layer = new LayerAPI({
    //   token: "ta0xZx4qb29lKCE4Yz8ffE3zwshR6POIbHZs2fA8uoeFpptt",
    //   appId: "layer:///apps/staging/010170ac-978a-11e5-b517-3a8a16005a40"
    // });

    var API_TOKEN = "ta0xZx4qb29lKCE4Yz8ffE3zwshR6POIbHZs2fA8uoeFpptt";
    var APP_ID = "layer:///apps/staging/010170ac-978a-11e5-b517-3a8a16005a40";

    var layer = new LayerAPI({
      token: API_TOKEN,
      appId: APP_ID
    });

    // Create a Conversation
    layer.conversations.create({participants: ['abcd']}, function(err, res) {
      var cid = res.body.id;

      // Send a Message
      layer.messages.sendTextFromUser(cid, 'abcd', 'Hello, World!', function(err, res) {
        console.log(err || res.body);
      });
    });
    
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator}/>;
  },
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'userslist'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
