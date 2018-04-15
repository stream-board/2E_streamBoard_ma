import React, { Component }from 'react';
import { View, StyleSheet } from 'react-native';
import {Container, Header, Content, Footer, Text} from "native-base";

import ChatMessageList from './ChatMessageList';
import ChatWebsocket from './ChatWebsocket';
import ChatList from './ChatList';

export default class Chat extends Component {
  render() {
    const { roomId } = this.props;
    return (
      <View style={styles.chatElement}>
        <Text style={{alignSelf: 'center', margin:10,}} >{`Chat Room ${roomId}`}</Text>
        <ChatMessageList roomId={roomId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatElement: {
    margin:5,
    flex: 1,

  },
})
