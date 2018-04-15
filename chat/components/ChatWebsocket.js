import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';

import Client from './../../apolloConfig';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';
import { chatActionsCreators } from './../chatRedux';
import { serverIp, port, entryPoint } from './../Server';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';


const mapStateToProps = (state) => ({
  chatMessageList: state.chatMessageList,
});

export class ChatWebsocket extends Component {

  constructor(props) {
    super(props);

    const { roomId } = props;
    this.state = { open: false, text: '' };
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
    console.log('Connected to chat socket');
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
      user_id: chatData.user_id,
      message: chatData.message
    }
    Store.dispatch(chatActionsCreators.addChatMessage(messageObj));
  }

  componentWillUnmount() {
    this.$socket.close();
  }

  sendMessage(message) {
    this.$socket.send(JSON.stringify({
      'category': 'NEW-MESSAGE',
      'room_id': this.props.roomId,
      'user_id': 1,
      'message': message
    }))
    this.setState({text: ''});
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFF00'}}>
        <TextInput
          onChangeText={(text) => { this.setState({ text: text })}}
          value={this.state.text}
        />
        <Button success
          onPress={() => this.sendMessage(this.state.text)}
          title="Enviar"
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(ChatWebsocket);
