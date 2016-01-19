// Import some code we need
var React = require('react-native');
var Geo = require('node-geo-distance');
var Icon = require('react-native-vector-icons/FontAwesome');


var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var globalStyles = require('./GlobalStyles');

// Create our component
module.exports = React.createClass({
  render: function() {
    var coord1 = {
      latitude: this.props.currentPosition.latitude,
      longitude: this.props.currentPosition.longitude
    };
    var coord2 = {
      latitude: this.props.user.get("location")["latitude"],
      longitude: this.props.user.get("location")["longitude"]
    };

    return (
      <View style={styles.userItemLine}>
        <View style={styles.topWrapper}>
          <Text style={styles.distance}>
            {(Geo.haversineSync(coord1, coord2) * 0.621371192).toFixed(2)} miles
          </Text>
        </View>

        <TouchableHighlight onPress={() => this.onConvoPresed()}>
        <View style={styles.bottomWrapper}>
          <View style={globalStyles.hashTags}>
            {this.hashTags()}
          </View>
          <View>
            <Text style={styles.rightArrow}>
              <Icon name="chevron-right" size={25} color="#666666" />
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      </View>
    );
  },
  onConvoPresed: function() {
    this.props.navigator.push({
      name: 'convo',
    });
  },
  hashTagStyle: function(hashTag) {
    var hashTags = this.props.currentUser.get('hashTags');
    if(hashTags.indexOf(hashTag) >= 0) {
      return {
        fontWeight: '400',
        fontSize: 25,
        color: "#669999",
        fontFamily: 'Helvetica',
        margin: 3,
        padding: 3,
        }
    } else {
      return {
        fontWeight: '200',
        fontSize: 15,
        color: "#669999",
        fontFamily: 'Helvetica',
        margin: 3,
        padding: 3,
        }
    }
  },
  hashTags: function() {
    var that = this;
    return this.props.user.get('hashTags').map(function(hashTag, index){
      return <View key={index} style={globalStyles.hashTagWrapper}>
        <View style={globalStyles.hashTagHolder}>
          <Text style={that.hashTagStyle(hashTag)}>{hashTag}</Text>
        </View>
      </View>
    });
  },

  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
  userItemLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#666666",
    backgroundColor: "#fff2e5",
  },
  topWrapper: {

  },
  bottomWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "row",
  },
  distance: {
    alignSelf: 'flex-start',
    margin: 1,
    padding: 1,
    color: "#666666",
  },
  rightArrow: {
    margin: 3,
    padding: 3,
  }
});
