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
          <Text style={styles.title}>add tags</Text>
          <Text comment={"this is a place holder for right nav item"}>   </Text>
        </View>

        <View style={styles.content}>
          <Text>AddTags Coming Soon.</Text>
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
  title: {
    fontWeight: '200',
    fontSize: 25,
    color: "#444444",
    fontFamily: 'Helvetica',
    alignSelf: 'flex-end',
    margin: 5,
  },

});
