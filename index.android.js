'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage
} = React;

var UserItem = require('./src/UserItem');

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

var TenTags = React.createClass({

  getInitialState: function() {
    return {
      user: null,
      currentPosition: 'unknown',
      usersNear: [],
      errorMessage: ""
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
                    this.setState({user: user});

                    var ttUser = require('./src/model/TTUser');
                    ttUser.addTag(user, "tenTags");
                    ttUser.addTag(user, "gossip");


                    ttUser.searchUsersWithMatchingTagsCloseBy(user)
                    .then((users) => {
                      this.setState({usersNear: users});
                    },
                    (error) => {
                      this.setState({errorMessage: error.message});
                      alert(error.message);
                    });

                  },
                  error: (user, error) => {
                    this.setState({errorMessage: error.message});
                    alert(error.message);
                  }
                });
              } else {
                console.log("3: user is initialized... " + user);
                user.fetch();

                var point = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
                user.set("location", point);
                user.save();
                this.setState({user: user});

                var ttUser = require('./src/model/TTUser');

                ttUser.searchUsersWithMatchingTagsCloseBy(user)
                .then((users) => {
                  this.setState({usersNear: users});
                },
                (error) => {
                  this.setState({errorMessage: error.message});
                  alert(error.message);
                });

              }; // if user
            },
            (error) => {
              console.log("error creating a new session...");
              this.setState({errorMessage: error.message});
              alert(error.message);
            });
          } catch (error) {
            console.log("error..." + error);
            this.setState({ errorMessage: error.message });
            alert(error.message);
          }
        },
        (error) => {
          alert(error.message + "\nYou have to enable GPS to use TenTags");
          this.setState({errorMessage: error.message});
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 90000}
      );
    },
    componentWillUnmount: function() {
      this.setState(null);
    },

    usersItems: function() {
      var usersItems = [];
      var users = this.state.usersNear;
      for(var i = 0; i < users.length; i++){
        var user = users[i];
        usersItems.push(
          <UserItem user={user} key={user.id}/>
        )
      }
      return usersItems;
    },

    render: function() {

      if (this.state.errorMessage.length > 0) {
        return (
          <View style={styles.container}>
            <Text>{this.state.errorMessage}</Text>
          </View>
        );
      }


      if (!this.state.user) {
        return (
          <View style={styles.container}>
            <Text>...loading...</Text>
          </View>
        );
      }




      var username = this.state.user.get('username');

      return (
        <ScrollView style={styles.container}>
            {this.usersItems()}
            {this.usersItems()}
            {this.usersItems()}
            {this.usersItems()}
            {this.usersItems()}
            {this.usersItems()}
        </ScrollView>
      );
    }

  });

  var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    title: {
      fontWeight: '500',
    }
  });

  AppRegistry.registerComponent('TenTags', () => TenTags);
