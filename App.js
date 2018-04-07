import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';

import Store from './reduxConfig';
import Client from './apolloConfig';
import RoomsList from './rooms/components/RoomsList';
import { RoomsCreateRoom } from './rooms/components/RoomsCreateRoom';
import RoomsDetail from './rooms/components/RoomsDetail';
import ChatMessageList from './chat/components/ChatMessageList';
import ChatWebsocket from './chat/components/ChatWebsocket';


export default class App extends Component {  
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <ApolloProvider client={Client}>
        <Provider store={Store}>
          <Container>
            <Header />
              <Content>
                <RoomsDetail roomId={1} />
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
