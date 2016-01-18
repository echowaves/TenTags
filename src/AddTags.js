var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;

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
        <View style={styles.container}>
          {this.navbarView()}
          {this.textInputView()}
          {this.completionListView()}
          {this.addButtonView()}
        </View>
      );
  },
  navbarView: function() {
    return (
      <View style={styles.navbar}>
        <TouchableHighlight style={styles.leftMenuItem} onPress={this.backButtonPressed}>
            <Icon name="chevron-left" size={25} color="#666666" />
        </TouchableHighlight>
        <Text style={styles.title}>add tags</Text>
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
      <View style={styles.addButtonWraper}>
        <TouchableHighlight style={styles.addButton} onPress={() => this.addNewTagPressed()}>
          <Text style={styles.addButtonText}>add this tag</Text>
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
  addButtonWraper: {
    alignSelf: 'center',
    margin: 15,
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    backgroundColor: "green",
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

});
