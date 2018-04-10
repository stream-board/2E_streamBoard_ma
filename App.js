import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Spinner, Button, Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon } from 'native-base';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';

import Store from './reduxConfig';
import Client from './apolloConfig';

import Expo from "expo";
import { RootStack } from './RootStack.js';

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
          <RootStack />
        </Provider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('App', () => RootStack);