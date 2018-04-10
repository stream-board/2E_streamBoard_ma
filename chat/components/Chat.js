import React, { Component }from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Container, Header, Content, Footer} from "native-base"

import ChatMessageList from './ChatMessageList';
import ChatWebsocket from './ChatWebsocket';
import ChatList from './ChatList';

export default class Chat extends Component {
  render() {
    const { roomId } = this.props;
    return (
      <Container>
        <Text>{`Chat Room ${roomId}`}</Text>
        <ChatMessageList roomId={roomId} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  chatContent: {
    backgroundColor: '#287b97'
  }
})
