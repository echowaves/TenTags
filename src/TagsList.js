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
        <View style={styles.addButtonWraper}>
          <TouchableHighlight style={styles.addButton} onPress={this.addNewTagPressed}>
              <Text style={styles.addButtonText}>add new tag</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },
  addNewTagPressed: function() {
      this.props.navigator.push({name: 'addtags'});
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },
  addButtonWraper: {
    alignSelf: 'center',
    margin: 15,
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    backgroundColor: "red",
  },
  addButton: {

  },
  addButtonText: {
    color: "white",
    fontWeight: '400',
    fontSize: 25,
    // color: "#003399",
    fontFamily: 'Helvetica',
    margin: 3,
    padding: 3,

  }


});
