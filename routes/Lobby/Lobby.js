import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Platform } from 'react-native';
import { Container,
         Header,
         Content,
         Spinner,
         Button,
         Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon, Fab } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants } from 'expo';

import RoomsList from './../../rooms/components/RoomsList';
import SignOut from "./../../sessions/components/SignOut";

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
      <Container style={{flex: 1,}}>
        <Text style={styles.titleElement}>Unete con el ID</Text>
        <View style={{height:80}}>
        <Grid>
        <Col size={3}>
          <Form>
            <Item floatingLabel >
                <Label>Id Room</Label>
                <Input onChangeText= {(text)=> this.setState({roomId:text})}
                  />
            </Item>
          </Form>
        </Col>
        <Col size={1}>
          <Button rounded style={styles.buttonElement} onPress={() => {
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
        </Col>
        </Grid>
        </View>

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
        <SignOut navigation={this.props.navigation}/>
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

  },

  buttonElement:{
    alignSelf: 'center',
    backgroundColor: '#26d3cd',
    margin: 10,

  },

  fabElement: {
    backgroundColor: '#26d3cd',
    zIndex: 5,

  },
});