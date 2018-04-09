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
import CreateRoomPage from './rooms/components/RoomsCreateRoom.js';
import RoomsList from './rooms/components/RoomsList.js';
import RoomsDetail from './rooms/components/RoomsDetail.js';
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
      <Container style={styles.container}>
        <Content >
          <Text>INICIAR SESION</Text>
          <Form>
              <Item floatingLabel>
                <Label>User Name</Label>
                <Input
                onChangeText= {(text)=>{
                  Store.dispatch( { type:'addRoomName', payload: text })
                }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText= {(text)=>{
                    Store.dispatch( { type:'addRoomDescription', payload: text })
                  }}
                />
              </Item>
          </Form>
          <Button rounded success onPress={() => this.props.navigation.navigate('MainMenu')}>
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
      <Container style={styles.container}>
        <Content style={styles.buttonsMainMenu}>
          <Button rounded primary onPress={() => this.props.navigation.navigate('CreateRoom')}>
            <Text>Crear sala</Text>
          </Button>
          <Button rounded primary onPress={() => this.props.navigation.navigate('JoinRoom')}>
            <Text>Unirse a sala</Text>
          </Button>
          <Button rounded primary onPress={() => this.props.navigation.goBack() }>
            <Text>Cerrar Sesion</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class JoinRoomPage extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      roomId: 27
    };
  }
  render() {
    return (
      <Container style={styles.container}>

        <Tabs locked={true} tabBarPosition={"overlayTop"}>
          <Tab heading="Buscar" tabBarPosition={"overlayTop"}>
          <Form>
            <Item floatingLabel>
                <Label>Id Room</Label>
                <Input onChangeText= {(text)=> this.setState({roomId:text})}
                  />
            </Item>
          </Form>
          <Button onPress={() => this.props.navigation.navigate('RoomsDetail' , { roomId: this.state.roomId })}>
            <Text>Buscar</Text>
          </Button>
          </Tab>
          <Tab heading="Rooms">
            <RoomsList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2FFD2',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  buttonsMainMenu: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',

  }
});


const RootStack = StackNavigator(
  {
    Login: { screen: LoginPage },
    MainMenu: { screen: MainMenuPage },
    JoinRoom: { screen: JoinRoomPage },

    RoomsList: {screen: RoomsList},
    CreateRoom: { screen: CreateRoomPage },
    RoomsDetail: { screen: RoomsDetail},
  },
  {
    initialRouteName: "Login",
  }
);

AppRegistry.registerComponent('App', () => RootStack);