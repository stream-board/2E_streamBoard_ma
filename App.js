import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Chat from './chat/components/Chat'
import ChatWebsocket from './chat/components/ChatWebsocket'
import { ChatRoomCreate } from './chat/components/ChatCreateRoom'
//import { ChatRoomCreateMutation } from './chat/TypesDef'

import BoardSocket from './board/components/BoardSocket';
import { BoardRoomCreate } from './board/components/BoardCreateRoom'

export default class App extends Component {

  state = {
    chatRoomInput: {
      id:1
    }
  }

  constructor(...args) {
    super(...args);

    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'http://192.168.0.28:5000/graphql'
      }),
      cache: new InMemoryCache()
    })
  }

  render() {
    const { chatRoomInput } = this.state;

    console.log(chatRoomInput);

    return (
      <ApolloProvider client={this.client}>
        <View style={styles.container}>
          <ChatWebsocket roomId={1} />
          <BoardSocket />
          <BoardRoomCreate />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
