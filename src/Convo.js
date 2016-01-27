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
    var user = this.props.route.user;
    var currentUser = this.props.route.currentUser;

    var ttMessage = require('./model/TTMessage');

    var that = this;
    var channel = pusher.subscribe( ttMessage.generateChannelName(user, currentUser));
    channel.bind('message', function(data) {
      // alert("sender=" + data['sender']);
      that.handleReceive({
        text: data['message'],
        sender: data['sender'],
        name: null,
        // image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        image: null,
        position: 'left', // left if received, right if sent
        date: new Date(),
      });

    });


    ttMessage.getMessages(user, currentUser)
    .then((results) => {
      var mappedResults = results.map(function(message, index){
        return {
          text: message.get('message'),
          name: null,
          image: null,
          position: message.get('sender') != currentUser.id ? 'left' : 'right',
          date: message.createdAt
        };
      });
      this.setState({messages: mappedResults.reverse()});
      // this.forceUpdate();
    },
    (error) => {
      alert(error.message);
    });
  },
  getInitialState: function() {
    return {
      messages: []
    };
  },
  handleSend(message = {}, rowID = null) {
    // Send message.text to your server

    var ttMessage = require('./model/TTMessage');

    var user = this.props.route.user;
    var currentUser = this.props.route.currentUser;

    ttMessage.addMessage(user, currentUser, message)
    .then(() => {
    },
    (error) => {
      alert(error.message);
    });

  },
  handleReceive(message) {
    // alert(message['sender'] + "=" + this.props.route.currentUser.id);
    if(message['sender'] != this.props.route.currentUser.id) {
      this._GiftedMessenger.appendMessage(message);
    }
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
          <Text style={globalStyles.title}>convo</Text>
          <Text comment={"this is a place holder for right nav item"}>   </Text>
        </View>

        <View style={globalStyles.content}>


          <GiftedMessenger
            ref={(c) => this._GiftedMessenger = c}
            messages={this.state.messages}
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
