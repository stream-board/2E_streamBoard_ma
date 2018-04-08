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

import Login from "./routes/Login/index.js";
import AAA from "./routes/Login/Login.js";
import Expo from "expo";

//los que debo cargar en /Room
import RoomsDetail from './rooms/components/RoomsDetail';
import ChatMessageList from './chat/components/ChatMessageList';
import ChatWebsocket from './chat/components/ChatWebsocket';

export default class App extends Component {  
  constructor(...args) {
    super(...args);
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <ApolloProvider client={Client}>
        <Provider store={Store}>
          <Container>
            <Header />
              <Content>
                <AAA />
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
