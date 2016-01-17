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
      user: null,
    };
  },
  componentWillMount: function() {
    this.setState({user: this.props.route.user});
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableHighlight style={styles.leftMenuItem} onPress={this.backButtonPressed}>
            <Icon name="chevron-left" size={25} color="#666666" />
          </TouchableHighlight>
          <Text style={styles.title}>my tags</Text>
          <Text comment={"this is a place holder for right nav item"}>   </Text>
        </View>
        <View style={styles.content}>
          {this.hashTags()}
        </View>
        <View style={styles.addButtonWraper}>
          <TouchableHighlight style={styles.addButton} onPress={this.addNewTagPressed}>
            <Text style={styles.addButtonText}>add new tag</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  removeHashTagPressed: function(hashTag) {
      alert("hashTag");
  },
  hashTags: function() {
    var that = this;
    return this.state.user.get('hashTags').map(function(hashTag, index){
      return (
      <TouchableHighlight key={index} style={styles.hashTagWrapper} onPress={() => that.removeHashTagPressed(hashTag)}>
        <View style={styles.hashTagHolder}>
          <Icon name="close" size={8} color="#666666" style={{alignSelf: 'center', marginLeft: 5}} />
          <Text style={styles.hashTag}>{hashTag}</Text>
        </View>
      </TouchableHighlight>
    );
    });
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
  title: {
    fontWeight: '200',
    fontSize: 25,
    color: "#444444",
    fontFamily: 'Helvetica',
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
  hashTagHolder: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
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



});
