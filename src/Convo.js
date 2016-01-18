var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

var globalStyles = require('./GlobalStyles');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.navbar}>
          <TouchableHighlight style={globalStyles.leftMenuItem} onPress={this.backButtonPressed}>
              <Icon name="chevron-left" size={25} color="#666666" />
          </TouchableHighlight>
          <Text style={globalStyles.title}>convo</Text>
          <Text comment={"this is a place holder for right nav item"}>   </Text>
        </View>

        <View style={globalStyles.content}>
          <Text>Convo Coming Soon.</Text>
        </View>
      </View>
    );
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },

});


var styles = StyleSheet.create({

});
