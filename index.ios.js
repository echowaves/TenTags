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

var TenTags = React.createClass({

  getInitialState: function() {
    return {
      user: null,
      currentPosition: 'unknown'
    };
  },

  componentWillMount: function() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentPosition = JSON.stringify(position);
        this.setState({currentPosition});
        console.log("currentPosition: " + currentPosition);
      }
      ,
      (error) => alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000}
    );

    //prod
    // Parse.initialize("zoYLGIcwju9NnQJxX6Kg4zV839tdwHCc2qNWKQGu", "DeTVIq6dl8x2hVynylVJneaDcvoRZ9vb3SOF04TW");
    //dev
    Parse.initialize("C0caJoLjtwhdtE3tXywMPzragKn7NxwPze0iZEIl", "cvmyxydA8IWtHRASJadWeFKNtM41VsvmObfsvgKi");
    try {
      Parse.User.currentAsync()
      .then(
        (user) => {
          if(user === null) {
            user = new Parse.User();

            var username = randomString(64);
            var password = randomString(64);

            user.set('username', username);
            user.set('password', password);
            user.signUp(null, {
              success: (user) => {
                console.log("1: user is initialized... " + user);
                this.setState({user: user});
              },
              error: (user, error) => {
                this.setState({errorMessage: error.message});
                alert(error.message);
              }
            });
          };
          console.log("3: user is initialized... " + user);
          this.setState({user: user});
        },
        (error) => {
          console.log("error creating a new session...");
          alert(error.message);
        });
      } catch (error) {
        console.log("error..." + error);
        this.setState({ errorMessage: error.message });
        alert(error.message);
      }
    },

    componentWillUnmount: function() {
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
      <Text>
            <Text style={styles.title}>Current position: </Text>
            {this.state.currentPosition}
      </Text>
    </View>
  );
}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
   fontWeight: '500',
  }
});

AppRegistry.registerComponent('TenTags', () => TenTags);
