import React, { Component }from 'react';
import { Text, View, StyleSheet } from 'react-native';

import ChatMessageList from './ChatMessageList';
import ChatWebsocket from './ChatWebsocket';
import ChatList from './ChatList';

export default class Chat extends Component {
  render() {
    const { roomId } = this.props;

    return (
      <View style={styles.chatContainer}>
        <Text>{`Chat Room ${roomId}`}</Text>
        <ChatMessageList roomId={roomId} />
        <ChatList />
        <ChatWebsocket roomId={roomId}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#287b97'
  }
})
