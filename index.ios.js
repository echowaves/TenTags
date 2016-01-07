'use strict';

var React = require('react-native');
// var Parse = require('parse').Parse;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} = React;

var TenTags = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function() {
    //prod
    // Parse.initialize("zoYLGIcwju9NnQJxX6Kg4zV839tdwHCc2qNWKQGu", "DeTVIq6dl8x2hVynylVJneaDcvoRZ9vb3SOF04TW");
    //dev
    Parse.initialize("C0caJoLjtwhdtE3tXywMPzragKn7NxwPze0iZEIl", "cvmyxydA8IWtHRASJadWeFKNtM41VsvmObfsvgKi");

    Parse.User.currentAsync()
    .then(
      (user) => {
        console.log("user is initialized... " + user);
        this.setState({user: user});
      },
      (error) => {
        console.log("creating a new session...");
      });
    },
    render: function() {
      if (!this.state.user) {
        return (
          <View style={styles.container}>
            <Text>...loading...</Text>
          </View>
        );
      }

      var username = this.state.user.get('username');

      return (
        <View style={styles.container}>
          <Text>{username}</Text>
        </View>
      );
    }
  });

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  AppRegistry.registerComponent('TenTags', () => TenTags);
