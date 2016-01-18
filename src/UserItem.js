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
          <View style={[styles.hashTags]}>
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
    borderBottomWidth: 1,
    borderColor: "#666666"
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
    backgroundColor: "#999966",
    margin: 1,
    padding: 1,
  },
  hashTag: {
    // lineHeight: 25,
    fontWeight: '400',
    fontSize: 25,
    // color: "#003399",
    fontFamily: 'Helvetica',
    margin: 3,
    padding: 3,

  },
  rightArrow: {
    margin: 3,
    padding: 3,
  }
});
