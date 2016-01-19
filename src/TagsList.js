var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Alert,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} = React;

var globalStyles = require('./GlobalStyles');

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
        <View style={globalStyles.container}>
          {this.navbar()}
          <View style={globalStyles.emptyContainer}>
            <Text style={[globalStyles.textSmall, {textAlign: 'center'}]}>
              You do not have any tags.
            </Text>
            <Text style={[globalStyles.textBig, {textAlign: 'center'}]}>
                Add some now.
              </Text>
          </View>
          {this.addButtonView()}
        </View>
      );
    } else {
      return (
        <View style={globalStyles.container}>
          {this.navbar()}
          <View style={globalStyles.content}>
            {this.hashTags()}
          </View>
          {this.addButtonView()}
        </View>
      );
    }
  },
  navbar: function() {
    return (
      <View style={globalStyles.navbar}>
        <TouchableHighlight style={globalStyles.leftMenuItem} onPress={() => this.backButtonPressed()}>
          <Icon name="chevron-left" size={25} color="#666666" />
        </TouchableHighlight>
        <Text style={globalStyles.title}>my tags</Text>
        <Text comment={"this is a place holder for right nav item"}>   </Text>
      </View>
    )
  },
  hashTags: function() {
    var that = this;
    return this.state.user.get('hashTags').map(function(hashTag, index){
      return (
        <TouchableHighlight key={index} style={globalStyles.hashTagWrapper} onPress={() => that.removeHashTagPressed(hashTag)}>
          <View style={globalStyles.hashTagHolder}>
            <Icon name="close" size={8} color="#666666" style={{alignSelf: 'center', marginLeft: 5}} />
            <Text style={globalStyles.hashTag}>{hashTag}</Text>
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
                that.updateParentComponent();
              },
              (error) => {
                alert(error.message);
              });
              that.forceUpdate();
              that.updateParentComponent();
            },
            function(error) {alert("error removing" + error.message);}
          )}
        },
      ]
    );
  },
  addButtonView: function() {
    return (
      <View style={globalStyles.buttonWraper}>
          <TouchableHighlight onPress={this.addNewTagPressed}>
            <Text style={globalStyles.buttonText}>add new tag</Text>
          </TouchableHighlight>
      </View>)
  },
  updateParentComponent: function() {
    this.state.parentComponent.setState({user: this.state.user});
    this.state.parentComponent.findUsersNear(this.state.user);
    this.state.parentComponent.forceUpdate();
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },
  addNewTagPressed: function() {
    this.props.navigator.push({
      name: 'addtags',
      parentComponent: this,
      user: this.state.user
    });
  }

});


var styles = StyleSheet.create({

});
