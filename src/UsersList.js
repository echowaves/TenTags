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

var globalStyles = require('./GlobalStyles');

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

                    this.findUsersNear(user);
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
    findUsersNear:function(user) {
      var ttUser = require('./model/TTUser');
      // ttUser.addTag(user, "tenTags");
      // ttUser.addTag(user, "gossip");


      ttUser.searchUsersWithMatchingTagsCloseBy(user)
      .then((users) => {
        this.setState({usersNear: users});
      },
      (error) => {
        this.setState({errorMessage: error.message});
        alert(error.message);
      });
    },
    componentWillUnmount: function() {
      this.setState(null);
    },
    render: function() {
      if (this.state.errorMessage.length > 0) {
        return (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[globalStyles.textBig, {textAlign: 'center',}]}>
              {this.state.errorMessage}
            </Text>
          </View>
        );
      }
      if (!this.state.user) {
        return (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[globalStyles.textBig, {textAlign: 'center',}]}>
              ...loading...
            </Text>
          </View>
        );
      }
      var username = this.state.user.get('username');


      var TAGS = this.state.user.get("hashTags");
      if(!TAGS || TAGS.length == 0 || this.state.usersNear.length == 0) {
        return (
          <View style={globalStyles.container}>
            {this.navbar()}
            <View style={globalStyles.emptyContainer}>
              <Text
                style={[globalStyles.textSmall, {textAlign: 'center'}]}>
                You don't have any tags overlaping with other users.
              </Text>
              <Text style={[globalStyles.textBig, {textAlign: 'center',}]}>
                To see who matters around you, review your tags by clicking on:
              </Text>
                <TouchableHighlight onPress={() => this.onTagsListPresed()}>
                  <Image source={require('../img/logo.png')}  style={{width: 100, height: 100}}/>
                </TouchableHighlight>
            </View>
          </View>
        );
      } else {
        return (
          <View style={globalStyles.container}>
            {this.navbar()}
            <ScrollView>
              {this.usersItems()}
            </ScrollView>
          </View>
        );
      }
    },
    navbar: function() {
      return (
        <View style={globalStyles.navbar}>
          <TouchableHighlight style={globalStyles.leftMenuItem} onPress={() => this.onTagsListPresed()}>
            <Image source={require('../img/logo.png')}  style={{width: 40, height: 40}}/>
          </TouchableHighlight>
          <Text style={globalStyles.title}>around me</Text>
          <TouchableHighlight style={globalStyles.rightMenuItem} onPress={() => this.onConvosListPresed()}>
            <Text style={styles.unreadCounter}>0</Text>
          </TouchableHighlight>
        </View>
      );
    },
    onTagsListPresed: function() {
      this.props.navigator.push({
        name: 'tagslist',
        user: this.state.user,
        parentComponent: this
      })
    },
    onConvosListPresed: function() {
      this.props.navigator.push({
        name: 'convoslist',
      });
    },
    usersItems: function() {
      var usersItems = [];
      var users = this.state.usersNear;
      if(!users) {
        return;
      };
      for(var i = 0; i < users.length; i++){
        var user = users[i];
        var currentPosition = JSON.parse(this.state.currentPosition).coords;
        usersItems.push(
          <UserItem key={user.id} user={user} currentPosition={currentPosition} navigator={this.props.navigator}/>
        )
      }
      return usersItems;
    },

  });

  var styles = StyleSheet.create({
    unreadCounter: {
      color: "white",
    },
  });
