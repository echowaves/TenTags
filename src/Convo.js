var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var GiftedMessenger = require('react-native-gifted-messenger');


var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} = React;

var globalStyles = require('./GlobalStyles');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  getMessages() {
    return [
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
    ];
  },
  handleSend(message = {}, rowID = null) {
    // Send message.text to your server
  },
  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message',
      name: 'Friend',
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
    });
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


          <GiftedMessenger
            ref={(c) => this._GiftedMessenger = c}
            messages={this.getMessages()}
            handleSend={() => this.handleSend()}
            maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
            style={globalStyles.container}
            styles={{
              bubbleLeft: {
                backgroundColor: '#e6e6eb',
                marginRight: 70,
              },
              bubbleRight: {
                backgroundColor: '#007aff',
                marginLeft: 70,
              },
            }}
          />


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
