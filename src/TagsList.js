var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableHighlight style={styles.leftMenuItem} onPress={this.backButtonPressed}>
              <Icon name="chevron-left" size={25} color="#666666" />
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          <Text>TagsList Coming Soon.</Text>
        </View>
      </View>
    );
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
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

});
