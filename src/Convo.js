var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var GiftedMessenger = require('react-native-gifted-messenger');
var Pusher = require('pusher-websocket-iso/react-native');


var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} = React;

var globalStyles = require('./GlobalStyles');

module.exports = React.createClass({
  componentWillMount: function() {
    var pusher = new Pusher('d0d034d3f44a78bc0ba9', {
      encrypted: true
    });

    var that = this;
    var channel = pusher.subscribe('my_channel');
    channel.bind('new_message', function(data) {
      that.handleReceive({
        text: data['message'],
        name: data['name'],
        // image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        image: null,
        position: 'left', // left if received, right if sent
        date: new Date(),
      });

    });
  },
  getInitialState: function() {
    return {
    };
  },
  getMessages() {
    return [
      {text: 'Are you building a chat app?', name: 'React-Native', image: null, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
    ];
  },
  handleSend(message = {}, rowID = null) {
    // Send message.text to your server

    var ttMessage = require('./model/TTMessage');


    var user = this.props.route.user;
    var currentUser = this.props.route.currentUser;

    // var channelId = ttMessage.generateChannelName(currentUser,user);
    // alert(channelId);

    ttMessage.addMessage(user, currentUser, message,rowID)
    .then(() => {
    },
    (error) => {
      alert(error.message);
    });

  },
  handleReceive(message = {}) {
    this._GiftedMessenger.appendMessage(message);
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
            handleSend={this.handleSend}
            maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
            displayNames={false}

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
