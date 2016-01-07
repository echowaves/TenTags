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
  AsyncStorage
} = React;

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

var username = null;
var password = null;


var TenTags = React.createClass({
  async _loadInitialState() {
    username = await AsyncStorage.getItem("USER_NAME");
    password = await AsyncStorage.getItem("PASSWORD");
  },
  async _saveStateLocal(key, value) {
    await AsyncStorage.setItem(key, value);
  },
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

    try {
      Parse.User.currentAsync()
      .then(
        (user) => {
          if(!user) {
            // try to sign in based on the local storage data
            this._loadInitialState();
            if(!username) { // no user previously stored in local storage, really need to sign up
              user = new Parse.User();

              username = randomString(36);
              password = randomString(36);

              user.set('username', username);
              user.set('password', password);
              user.signUp(null, {
                success: (user) => {
                  console.log("1 user is initialized... " + user);
                  this._saveStateLocal('USER_NAME', username);
                  this._saveStateLocal('PASSWORD', password);
                  this.setState({user: user});
                },
                error: (user, error) => { this.setState({errorMessage: error.message}); }
              });
            } else {// sign in here
              Parse.User.logIn(username, password, {
                success: (user) => {
                  console.log("2 user is initialized... " + user);
                  this._saveStateLocal('USER_NAME', username);
                  this._saveStateLocal('PASSWORD', password);
                  this.setState({user: user});
                },
                error: (data, error) => { this.setState({ errorMessage: error.message }); }
              });
            }
          };
          console.log("3 user is initialized... " + user);
          this.setState({user: user});
        },
        (error) => {
          console.log("creating a new session...");
        });
      } catch (error) {
        this.setState({ errorMessage: error.message });
      }
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
