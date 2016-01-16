var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  StyleSheet,
  Navigator
} = React;

var UsersList = require('./UsersList');
var TagsList = require('./TagsList');
var AddTags = require('./AddTags');
var ConvosList = require('./ConvosList');

var ROUTES = {
  userslist: UsersList,
  tagslist: TagsList,
  addtags: AddTags,
  convoslist: ConvosList,
};


module.exports = React.createClass({
  componentWillMount: function() {
    //prod
    // Parse.initialize("zoYLGIcwju9NnQJxX6Kg4zV839tdwHCc2qNWKQGu", "DeTVIq6dl8x2hVynylVJneaDcvoRZ9vb3SOF04TW");
    //dev
    Parse.initialize("C0caJoLjtwhdtE3tXywMPzragKn7NxwPze0iZEIl", "cvmyxydA8IWtHRASJadWeFKNtM41VsvmObfsvgKi");
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
