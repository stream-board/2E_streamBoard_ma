import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import { Container, Header, Content, Spinner } from 'native-base';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';

import Chat from './chat/components/Chat';
import ChatWebsocket from './chat/components/ChatWebsocket'
import { ChatRoomCreate } from './chat/components/ChatCreateRoom'
//import { ChatRoomCreateMutation } from './chat/TypesDef'

import BoardSocket from './board/components/BoardSocket';
import { BoardRoomCreate } from './board/components/BoardCreateRoom'

import RoomCreate, { RoomCreateRoom } from './rooms/components/TestPor'
import RoomsList from './rooms/components/RoomsList'

import Store from './reduxConfig';

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
        <Provider store={Store}>
          <Container>
            <Header />
            <Content>
              <View>
                <RoomCreate key={0}/>
                <RoomsList />
              </View>
            </Content>
          </Container>
        </Provider>
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
