import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Buttom
} from 'react-native';

import Client from './../../apolloConfig';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';
import { actionCreators } from './../../rooms/roomsRedux';
import { serverIp, port, entryPoint } from './../Server';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';


const mapStateToProps = (state) => ({
  chatMessageList: state.chatMessageList,
});

export class ChatWebsocket extends Component {

  constructor(props) {
    super(props);

    const { roomId } = props;
    this.state = { open: false };
    this.$socket = new WebSocket(`ws:${serverIp}:${port}/${entryPoint}/${roomId}`);
    this.emit = this.emit.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onOpen.bind(this);
  }

  emit() {
    this.setState( prevState => ({ open: !prevState.open }));
  }

  componentDidMount() {
    const { roomId } = this.props;
    this.$socket.onmessage = this.onMessage;
    this.$socket.onopen = this.onOpen;
  }

  onMessage({ data }) {
    let chatData = JSON.parse(data);

    if(chatData.category === 'JOIN-ROOM') {
      this.joinMessage(chatData.message);
    } else {
      this.onAddMessage(chatData);
    }
  }

  onOpen() {
    const { roomId } = this.props;
    console.log('Connected');
    this.$socket.send(
      JSON.stringify({
        'category': 'JOIN-ROOM',
        'room_id': roomId,
        'user_id': '1'
      })
    );
  };

  joinMessage(message) {
    console.log(message);
  }

  onAddMessage(chatData) {
    let messageObj = {
      id: chatData.id,
      userId: chatData.user_id,
      message: chatData.message
    }
    Store.dispatch(actionCreators.addChatMessage(messageObj));
  }

  componentWillUnmount() {
    this.$socket.close();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFF00'}}>
        <Text>Hola</Text>
      </View>
    )
  }
}

export default connect(mapStateToProps)(ChatWebsocket);
