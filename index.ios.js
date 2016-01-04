'use strict';


var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
} = React;

var TenTags = React.createClass({
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

AppRegistry.registerComponent('TenTags', () => TenTags);
