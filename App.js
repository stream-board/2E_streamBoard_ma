import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Chat from './chat/components/Chat'
import ChatWebsocket from './chat/components/ChatWebsocket'


export default class App extends Component {
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
    return (
      <ApolloProvider client={this.client}>
        <View style={styles.container}>
          <ChatWebsocket roomId={1}/>
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
