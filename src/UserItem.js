// Import some code we need
var React = require('react-native');
var Geo = require('node-geo-distance');

var {
  StyleSheet,
  Text,
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
      <View style={styles.userItemLine}>
        <View style={[ this.border("green")]}>
          <Text>
            {(Geo.haversineSync(coord1, coord2) * 0.621371192).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.hashTags, this.border("yellow")]}>
          {this.hashTags()}
        </View>
        <View>
          <Text style={styles.rightArrow}>
            >
          </Text>
        </View>
      </View>
    );
  },
  hashTags: function() {
    return this.props.user.get('hashTags').map(function(hashTag, index){
      return <View key={index}>
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
    flexDirection: "row"
  },
  hashTags: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: 'wrap'
  },
  hashTag: {
    lineHeight: 25,
    fontWeight: '400',
    fontSize: 25,
    color: "003399",
    backgroundColor: "#bfffef",
    margin: 5,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#666666"
  },
  rightArrow: {
    lineHeight: 25,
    fontWeight: '700',
    fontSize: 25,
    color: "003399"
  }
});

// Make this code available elsewhere
module.exports = UserItem;
