var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>TagsList Coming Soon.</Text>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
