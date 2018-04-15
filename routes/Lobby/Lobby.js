import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Platform } from 'react-native';
import { Container,
         Header,
         Content,
         Spinner,
         Button,
         Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon, Fab } from 'native-base';
import { Constants } from 'expo';

import RoomsList from './../../rooms/components/RoomsList';

import { Mutation } from 'react-apollo';
import { JOIN_ROOM_MUTATION } from "./../../rooms/TypesDef";

import Store from "./../../reduxConfig";
import { roomActionCreators } from './../../rooms/roomsRedux';


export default class LobbyPage extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      //variable to FAB
      active: 'true',
      joinedToRoom: false,
      navigation: this.props.navigation,
    }

    this.onLobby = this.onLobby.bind(this);
    this.onJoinRoom = this.onJoinRoom.bind(this);
  }

  onLobby(joinRoom) {
    return (
      <Container style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
      <Header style={{ height: 50}}>
          <Left />
          <Body>
            <Title>Title</Title>
            <Subtitle>Subtitle</Subtitle>
          </Body>
          <Right />
        </Header>
        <Text>Unete con el ID</Text>
        <Form>
          <Item floatingLabel >
              <Label>Id Room</Label>
              <Input onChangeText= {(text)=> this.setState({roomId:text})}
                />
          </Item>
        </Form>
        <Button onPress={() => {
            joinRoom({
              variables: {
                room: {
                  idRoom: this.state.roomId,
                  idOwner: Store.getState().currentUser.id
                }
              }
            })
            this.setState({ joinedToRoom: true });
          }}>
          <Text>Buscar</Text>
        </Button>
      {/*LIST OF ROOMS*/}
      <Content>
        <RoomsList navigation={this.state.navigation} joinRoom={joinRoom}/>
      </Content>
        <Fab
          active = {this.state.active}
          style={styles.fabElement}
          position='bottomRight'
          onPress={() => this.props.navigation.navigate('CreateRoom')}
        >
        <Icon name="add" />
        </Fab>
      {/*LOG OUT*/}  

        <Button rounded primary style={ styles.buttonStyle } onPress={() => this.props.navigation.goBack() }>
          <Text>Cerrar Sesion</Text>
        </Button>
     </Container>
    )
  }

  onJoinRoom(data) {
    return(
      <Spinner />
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.joinedToRoom) {
      this.props.navigation.navigate('RoomsDetail', { roomId: this.state.roomId})
    }
  }

  render() {
    return (
      <Mutation mutation={JOIN_ROOM_MUTATION}>
      {(joinRoom, {loading, error, data})=>(
        <View  style={styles.container}>
        {(data ? this.onJoinRoom(data): this.onLobby(joinRoom))}
        {loading && <Spinner />}
        {error && <Text></Text>}
        </View>
      )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2FFD2',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },

  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  formElement: {
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    width: 300,
    margin: 20,

  },

  buttonStyle:{
    marginTop: 30,
    backgroundColor: 'blue',
    alignSelf: 'center',

  },

  fabElement: {
    backgroundColor: '#5067FF',
    zIndex: 5,

  },
});