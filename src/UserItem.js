// Import some code we need
var React = require('react-native');
var Geo = require('node-geo-distance');

var {
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
      <View>
        <Text style={this.style()}>
          {(Geo.haversineSync(coord1, coord2) * 0.621371192).toFixed(2)}
        </Text>
        <Text style={this.style()}>
          {this.props.user.get('hashTags')}
        </Text>
      </View>
    );
  },
  style: function() {
    return {
      color: "blue",
      fontWeight: '700',
      fontSize: 25,
      lineHeight: 25
    }
  }
});

// Make this code available elsewhere
module.exports = UserItem;
