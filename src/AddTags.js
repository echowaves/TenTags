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
      showCompletions: false,
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
    if (this.state.showCompletions) {
      return (
        <View style={styles.container}>
          {this.navbarView()}
          {this.textInputView()}
          {this.completionListView()}
          {this.addButtonView()}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.navbarView()}
          {this.textInputView()}
          {this.addButtonView()}
        </View>
      );
    }
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
          maxLength={20}
          multiline={false}
          style={styles.textInput}
          placeholder="tag up to 20 characters"
          onChangeText={(hashTag) => {
            this.setState({hashTag});
            this.setState({showCompletions: true});
          }}
          value={this.state.hashTag}
          />
      </View>
    )
  },
  completionListView: function() {
    var text = "qweqweqwe";
    return (
      <View>
        <TouchableHighlight
          key={text}
          onPress={() => this.completionSelectedPressed(text)}>
          <Text style={{
              color: "orange",
              fontSize: 20,
              margin: 5,
              padding: 5,
            }}>{text}</Text>
        </TouchableHighlight>
      </View>
    )
  },
  addButtonView: function() {
    return (
      <View style={styles.addButtonWraper}>
        <TouchableHighlight style={styles.addButton} onPress={() => this.addNewTagPressed}>
          <Text style={styles.addButtonText}>add this tag</Text>
        </TouchableHighlight>
      </View>
    )
  },
  backButtonPressed: function() {
    this.props.navigator.pop();
  },
  completionSelectedPressed: function(text) {
    this.setState({
      hashTag: text,
      showCompletions: false,
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
    backgroundColor: "grey",
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
