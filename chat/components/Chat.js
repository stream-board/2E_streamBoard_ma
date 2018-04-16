import React, { Component }from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Container, Header, Content, Footer, Text, H1} from "native-base";

import ChatMessageList from './ChatMessageList';
import ChatWebsocket from './ChatWebsocket';
import ChatList from './ChatList';

export default class Chat extends Component {
  render() {
    const { roomId } = this.props;
    return (
      <View style={styles.chatElement}>
        <H1 style={{alignSelf: 'center', margin:10,}} >{`Chat Room ${roomId}`}</H1>
        <ChatMessageList roomId={roomId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatElement: {
    paddingHorizontal: 5,
    flex: 1,
    width: Dimensions.get('screen').width,
  },
})
