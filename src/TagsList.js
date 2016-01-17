var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Alert,
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
    this.setState(
      {
        user: this.props.route.user,
        parentComponent: this.props.route.parentComponent
      }
    );
  },
  render: function() {
    var TAGS = this.state.user.get("hashTags");
    if(!TAGS || TAGS.length == 0) {
      return (
        <View style={styles.container}>
          {this.navbar()}
          <View style={styles.noTagsContainer}>
            <Text style={{fontWeight: '200',
                  fontSize: 18,
                  color: "#666666",
                  fontFamily: 'Helvetica',
                  textAlign: 'center',
}}>You do not have any tags.</Text>
            <Text style={{fontWeight: '400',
                  fontSize: 24,
                  color: "#888888",
                  fontFamily: 'Helvetica',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Add some now.
              </Text>
          </View>
          <View style={styles.addButtonWraper}>
            <TouchableHighlight style={styles.addButton} onPress={this.addNewTagPressed}>
              <Text style={styles.addButtonText}>add new tag</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.navbar()}
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
    }
  },
  navbar: function() {
    return (
      <View style={styles.navbar}>
        <TouchableHighlight style={styles.leftMenuItem} onPress={this.backButtonPressed}>
          <Icon name="chevron-left" size={25} color="#666666" />
        </TouchableHighlight>
        <Text style={styles.title}>my tags</Text>
        <Text comment={"this is a place holder for right nav item"}>   </Text>
      </View>
    )
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
  removeHashTagPressed: function(hashTag) {
    var that = this;
    Alert.alert(
      "Sure to delete?",
      hashTag ,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => {

          this.state.user.get("hashTags").splice(this.state.user.get("hashTags").indexOf(hashTag),1);
          this.state.user.save().then(
            function(object) {
              var ttUser = require('./model/TTUser');

              ttUser.searchUsersWithMatchingTagsCloseBy(that.state.user)
              .then((users) => {
                that.state.parentComponent.setState({usersNear: users});
              },
              (error) => {
                alert(error.message);
              });
              that.forceUpdate();
              that.state.parentComponent.setState({user: that.state.user});
              that.state.parentComponent.forceUpdate();
            },
            function(error) {alert("error removing" + error.message);}
          )}
        },
      ]
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
  noTagsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
