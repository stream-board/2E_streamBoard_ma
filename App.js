import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Spinner, Button, Body, Tabs, Tab, Text, Title, Input } from 'native-base';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';

import Store from './reduxConfig';
import Client from './apolloConfig';

import Expo from "expo";
import CreateRoomPage from './rooms/components/RoomsCreateRoom.js';
import { StackNavigator } from "react-navigation";

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


class LoginPage extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>INICIAR SESION</Text>
          <Input />
          <Button primary onPress={() => this.props.navigation.navigate('MainMenu')}>
            <Text>INGRESAR</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class MainMenuPage extends Component {
  render() {
    return (
      <Container>
      <Header>
        <Body>
          <Title>Stream Board</Title>
        </Body>
      </Header>
        <Content>
          <Button primary onPress={() => this.props.navigation.navigate('CreateRoom')}>
            <Text>Crear sala</Text>
          </Button>
          <Button primary onPress={() => this.props.navigation.navigate('JoinRoom')}>
            <Text>Unirse a sala</Text>
          </Button>
          <Button primary onPress={() => this.props.navigation.goBack() }>
            <Text>Cerrar Sesion</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class JoinRoomPage extends Component {
  render() {
    return (
      <Container>
      <Header>
        <Text>Join Room</Text>
      </Header>
      <Content>
        <Tabs locked={true} tabBarPosition={"overlayTop"}>
          <Tab heading="Buscar" tabBarPosition={"overlayTop"}>
            <Text>Digite Id de la Sala</Text>
          </Tab>
          <Tab heading="Rooms">
            <Spinner />
          </Tab>
        </Tabs>
      </Content>
      </Container>
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


const RootStack = StackNavigator(
  {
    Login: { screen: LoginPage },
    MainMenu: { screen: MainMenuPage },
    JoinRoom: { screen: JoinRoomPage },

    CreateRoom: { screen: CreateRoomPage },
  },
  {
    initialRouteName: "Login",
  }
);

AppRegistry.registerComponent('App', () => RootStack);