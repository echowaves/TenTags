// Import some code we need
var React = require('react-native');
var Geo = require('node-geo-distance');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

// Create our component
var UserItem = React.createClass({
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
      <View style={[styles.userItemLine, this.border("red")]}>
        <View style={styles.topWrapper}>
          <Text>
            {(Geo.haversineSync(coord1, coord2) * 0.621371192).toFixed(2)}
          </Text>
        </View>

        <TouchableHighlight>
        <View style={styles.bottomWrapper}>
          <View style={[styles.hashTags]}>
            {this.hashTags()}
          </View>
          <View>
            <Text style={styles.rightArrow}>
              >
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      </View>
    );
  },
  hashTags: function() {
    return this.props.user.get('hashTags').map(function(hashTag, index){
      return <View key={index} style={styles.hashTagWrapper}>
        <Text style={styles.hashTag}>{hashTag}</Text>
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
    alignSelf: 'flex-start'
  },
  hashTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // height: 35,
  },
  hashTagWrapper: {
    borderRadius: 5,
    // borderColor: "#666666",
    backgroundColor: "#bfffef",
    margin: 3,
    padding: 3,

  },
  hashTag: {
    lineHeight: 25,
    fontWeight: '400',
    fontSize: 25,
    color: "#003399",
    fontFamily: 'Helvetica',
  },
  rightArrow: {
    lineHeight: 25,
    fontWeight: '700',
    fontSize: 25,
    color: "#003399",
    // alignSelf: "flex-end",
  }
});

// Make this code available elsewhere
module.exports = UserItem;
