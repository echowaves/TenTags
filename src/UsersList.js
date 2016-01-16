var React = require('react-native');
var Parse = require('parse/react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} = React;

var UserItem = require('./UserItem');

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

module.exports = React.createClass({

  getInitialState: function() {
    return {
      user: null,
      currentPosition: 'unknown',
      usersNear: [],
      errorMessage: ""
    };
  },

  componentWillMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentPosition = JSON.stringify(position);
        this.setState({currentPosition: currentPosition});
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

                    var ttUser = require('./model/TTUser');
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

                var ttUser = require('./model/TTUser');

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
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableHighlight style={styles.leftMenuItem} onPress={this.onTagsListPres}>
              <Image source={require('../img/logo.png')}  style={{width: 40, height: 40}}/>
            </TouchableHighlight>
            <Text style={styles.title}>around me</Text>
            <TouchableHighlight style={styles.rightMenuItem} onPress={this.onConvosListPres}>
              <Text style={styles.unreadCounter}>0</Text>
            </TouchableHighlight>
          </View>
          <ScrollView>
            {this.usersItems()}
          </ScrollView>
        </View>
      );
    },
    onTagsListPres: function() {
      this.props.navigator.push({
        name: 'tagslist',
        user: this.state.user
      })
    },
    onConvosListPres: function() {
      this.props.navigator.push({
        name: 'convoslist',
      });
    },
    usersItems: function() {
      var usersItems = [];
      var users = this.state.usersNear;
      for(var i = 0; i < users.length; i++){
        var user = users[i];
        var currentPosition = JSON.parse(this.state.currentPosition).coords;
        usersItems.push(
          <UserItem key={user.id} user={user} currentPosition={currentPosition} />
        )
      }
      return usersItems;
    },

  });

  var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 60,
      backgroundColor: "#779966",
    },
    leftMenuItem: {
      alignSelf: 'flex-end',
      margin: 5,
    },
    title: {
      fontWeight: '200',
      fontSize: 25,
      color: "#444444",
      fontFamily: 'Helvetica',
      alignSelf: 'flex-end',
      margin: 5,
    },
    rightMenuItem: {
      alignSelf: 'center',
      margin: 15,
      marginTop: 22,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 5,
      backgroundColor: "red",
    },

    unreadCounter: {
      color: "white",
    }
  });
