import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Chat from './chat/components/Chat'
import ChatWebsocket from './chat/components/ChatWebsocket'
import ChatCreateRoom from './chat/components/ChatCreateRoom'
import { ChatRoomCreateMutation } from './chat/TypesDef'

import BoardSocket from './board/components/BoardSocket';

import { Mutation } from 'react-apollo';

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
          <BoardSocket />
          <ChatRoomCreate />
        </View>
      </ApolloProvider>
    );
  }
}

const ChatRoomCreate = () => {

    let input = {
      id: 21
    };

    return (
      <Mutation mutation={ChatRoomCreateMutation}>
        {(createChatRoom, { data }) => (
          <View>
            {console.log(data)}
            <Button
              onPress={() => {
                createChatRoom({ variables: { chatRoom: input } })
              }}
              title="Create Room with id 100"
              color="#841584"
            />
          </View>
        )}
      </Mutation>
    )
  }

  state = {
    chatRoomInput: {
      id: 100
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
