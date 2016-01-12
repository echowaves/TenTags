// Import some code we need
var React = require('react-native');
var Text = React.Text;

// Create our component
var UserItem = React.createClass({
  render: function() {
    return <Text style={this.style()}>
      {this.props.user.get('username')}
    </Text>
  },
  style: function() {
    return {
      color: "blue",
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 15
    }
  }
});

// Make this code available elsewhere
module.exports = UserItem;
