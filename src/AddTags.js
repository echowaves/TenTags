var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;

var globalStyles = require('./GlobalStyles');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user:null,
      hashTag: "",
      completions: [],
      parentComponent: this.props.route.parentComponent
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
      return (
        <View style={globalStyles.container}>
          {this.navbarView()}
          {this.textInputView()}
          {this.completionListView()}
          {this.addButtonView()}
        </View>
      );
  },
  navbarView: function() {
    return (
      <View style={globalStyles.navbar}>
        <TouchableHighlight style={globalStyles.leftMenuItem} onPress={this.backButtonPressed}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="chevron-left" size={25} color="#666666" /><Text>     </Text>
          </View>
        </TouchableHighlight>
        <Text style={globalStyles.title}>add tags</Text>
        <Text comment={"this is a place holder for right nav item"}>   </Text>
      </View>
    )
  },
  textInputView: function() {
    return (
      <View style={styles.textInputWrapper}>
        <TextInput
          autoFocus={true}
          autoCapitalize='none'
          maxLength={20}
          multiline={false}
          style={styles.textInput}
          placeholder='tag up to 20 characters'
          onChangeText={(text) => this.typingText(text)}
          value={this.state.hashTag}
          />
      </View>
    )
  },
  completionListView: function() {
    var that = this;
    return this.state.completions.map(function(hashTag, index){
        return(
            <TouchableHighlight
              key={hashTag}
              onPress={() => that.completionSelectedPressed(hashTag)}>
              <Text style={{
                  color: "orange",
                  fontSize: 20,
                  margin: 5,
                  padding: 5,
                }}>{hashTag}</Text>
            </TouchableHighlight>
        );
      });
  },
  addButtonView: function() {
    return (
      <View style={globalStyles.buttonWraper}>
        <TouchableHighlight style={globalStyles.button} onPress={() => this.addNewTagPressed()}>
          <Text style={globalStyles.buttonText}>add this tag</Text>
        </TouchableHighlight>
      </View>
    )
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },
  addNewTagPressed: function() {
    var that = this;
    var ttUser = require('./model/TTUser');

    if(!this.state.hashTag || this.state.hashTag.trim().length == 0) {
      return;
    };

    ttUser.addTag(this.state.user, this.state.hashTag)
    .then(() => {
      that.state.parentComponent.setState({user: that.state.user});
      that.state.parentComponent.updateParentComponent();
      that.props.navigator.pop();
    },
    (error) => {
      alert(error.message);
    });

  },
  typingText: function(hashTag) {
    this.setState({hashTag: hashTag});

    var ttHashTag = require('./model/TTHashTag');

    ttHashTag.autoComplete(hashTag)
    .then((hashTags) => {
      this.setState({completions: hashTags.map(function(hashTag, index){
        return hashTag.get("hashTag");
      })});
    },
    (error) => {
      alert(error.message);
    });
  },
  completionSelectedPressed: function(hashTag) {
    this.setState({
      hashTag: hashTag,
    });
  },
});


var styles = StyleSheet.create({

  textInputWrapper: {

  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontWeight: '200',
    fontSize: 30,
    color: "#666666",
    fontFamily: 'Helvetica',
    borderRadius: 5,
    margin: 3,
    padding: 3,
  },

});
