'use strict';

var React = require('react-native');
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
    //prod
    // Parse.initialize("zoYLGIcwju9NnQJxX6Kg4zV839tdwHCc2qNWKQGu", "DeTVIq6dl8x2hVynylVJneaDcvoRZ9vb3SOF04TW");
    //dev
    Parse.initialize("C0caJoLjtwhdtE3tXywMPzragKn7NxwPze0iZEIl", "cvmyxydA8IWtHRASJadWeFKNtM41VsvmObfsvgKi");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentPosition = JSON.stringify(position);
        this.setState({currentPosition});
        console.log("currentPosition: " + currentPosition);

        try {
          Parse.User.currentAsync()
          .then(
            (user) => {
              if(user == null) {
                user = new Parse.User();

                var username = randomString(64);
                var password = randomString(64);

                user.set('username', username);
                user.set('password', password);
                user.signUp(null, {
                  success: (user) => {
                    console.log("1: user is initialized... " + user);
                    //update coordinates and add default tags here

                    var point = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
                    user.set("location", point);
                    user.save();

                    var ttUser = require('./src/model/TTUser');
                    ttUser.addTag(user, "tenTags");
                    ttUser.addTag(user, "gossip");

                    this.setState({user: user});
                  },
                  error: (user, error) => {
                    this.setState({errorMessage: error.message});
                    alert(error.message);
                  }
                });
              } else {
                console.log("3: user is initialized... " + user);

                var point = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
                user.set("location", point);
                user.save();

                this.setState({user: user});
              }; // if user
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
        (error) => alert(error.message + "\nYou have to enable GPS to use TenTags"),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000}
      );
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
