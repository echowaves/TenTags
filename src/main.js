var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  MapView,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <MapView style={styles.map}></MapView>
    );
  }
});

var styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
