import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Buttom
} from 'react-native';

export default class ChatWebsocket extends Component {

  constructor(props) {
    super(props);

    const { roomId } = props;
    this.state = { open: false };
    this.socket = new WebSocket(`ws:192.168.0.28:4004/chat-room/${roomId}`);
    this.emit = this.emit.bind(this);
  }

  emit() {
    this.setState( prevState => ({ open: !prevState.open }));
  }

  componentDidMount() {
    const { roomId } = this.props;

    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          'category': 'JOIN-ROOM',
          'room_id': roomId,
          'sender': 'Usertest'
        })
      )
    }

    this.socket.onmessage = ({ data }) => console.log(JSON.parse(data));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFF00'}}>
        <Text>{'Hola'}</Text>
      </View>
    )
  }
}
