import React, { Component } from 'react';
import ChatRoom from './ChatRoom.jsx';

const propTypes = {
  message: React.PropTypes.string.isRequired,
};

class App extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <ChatRoom />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
