import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Platform, Image } from 'react-native';
import { Container,
         Header,
         Content,
         Footer,
         Spinner,
         Button,
         Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon, Fab, Thumbnail, H1 } from 'native-base';
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
      <Container style={{flex: 1,paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
        <View style={{alignItems: 'center', height: 80, margin:5}}>
          <Thumbnail large source={{uri: Store.getState().currentUser.image}} />
        </View>
        <View style={{height:90}}>
        <Grid>
        <Col size={3}>
          <Form>
            <Item floatingLabel >
                <Label>Join with the ID</Label>
                <Input onChangeText= {(text)=> this.setState({roomId:text})}
                  />
            </Item>
          </Form>
        </Col>
        <Col size={1} style={{justifyContent: 'center',}}>
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
            <Text>Search</Text>
          </Button>
        </Col>
        </Grid>
        </View>

      {/*LIST OF ROOMS*/}
      <Content style={{borderRadius: 8}}>
        <RoomsList navigation={this.state.navigation} joinRoom={joinRoom}/>
      </Content>
      <Footer style={{marginTop:10, backgroundColor:'white'}}>
        <Grid style={{justifyContent: 'center',}}>
          <Col size={1}>
            <SignOut navigation={this.props.navigation}/>
          </Col>
          <Col size={3}>
            <Image 
              style = { styles.imageElement }
              source = { require('./../../logo.png' ) }
            />
          </Col>
          <Col size={1}>
            <Button
              rounded
              style={styles.buttonElement}
              onPress={() => this.props.navigation.navigate('CreateRoom')}
            >
        <Icon name="add" />
        </Button>
          </Col>
        </Grid>
      {/*LOG OUT*/}  
      </Footer>
     </Container>
    )
  }

  onJoinRoom(data) {
    return (
      <Spinner />
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.joinedToRoom) {
      return this.props.navigation.navigate('RoomsDetail', { 
        roomId: this.state.roomId,
      })
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
    backgroundColor: '#174557',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },

  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  imageElement:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    padding: 3,
  },

  formElement: {
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  buttonElement:{
    alignSelf: 'center',
    backgroundColor: '#26d3cd',
    margin: 5,

  },

});