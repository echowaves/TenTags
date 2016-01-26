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
            <View style={{flexDirection: 'row'}}>
              <Icon name="chevron-left" size={25} color="#666666" /><Text>     </Text>
            </View>
          </TouchableHighlight>
          <Text style={globalStyles.title}>my convos</Text>
          <Text comment={"this is a place holder for right nav item"}>   </Text>
        </View>

        <View style={globalStyles.content}>
          <Text>ConvosList Coming Soon.</Text>
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
