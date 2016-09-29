import React, { Component } from 'react';
// import firebase from '../../firebase.config.js';

class ChatRoom extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      message: '',
      messages: [],
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    console.log('mounted');
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val();
      if (currentMessages !== null) {
        this.setState({
          messages: currentMessages,
        });
      }
    });
  }
  updateMessage(e) {
    console.log(`updateMessage: ${e.target.value}`);
    this.setState({
      message: e.target.value,
    });
  }
  submitMessage(e) {
    console.log(`submitMessage: ${this.state.message}`);
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message,
    };
    firebase.database().ref(`messages/${nextMessage.id}`).set(nextMessage);
    // let list = Object.assign([], this.state.messages);
    // list.push(nextMessage);
    // this.setState({
    //   messages: list,
    // });
  }
  render() {
    const currentMessage = this.state.messages.map((message, idx) => {
      return (
        <li key={message.id}>{message.text}</li>
      );
    });
    return (
      <div>
        <ul>
          {currentMessage}
        </ul>
        <input
          onChange={this.updateMessage}
          type="text"
          placeholder="say something" />
        <input
          type="submit"
          onClick={this.submitMessage}
        />
      </div>
    );
  }
}

export default ChatRoom;
