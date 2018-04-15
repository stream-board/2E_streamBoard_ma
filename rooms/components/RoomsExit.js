
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions} from 'react-native';
import {
  Text,
  Spinner,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Title,
  Label
} from 'native-base';

import { roomActionCreators } from "./../roomsRedux";
import { EXIT_ROOM_MUTATION } from './../TypesDef'

import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';

export default class RoomExit extends Component {
  constructor(props) {
    super(props);

    this.state = { exitRoom: false };
    this.onForm = this.onForm.bind(this);
    this.onExitRoom = this.onExitRoom.bind(this);
  }

  onForm(exitRoom) {
    const roomOwner = this.props.roomObj.owner.id;
    const currentId = Store.getState().currentUser.id;
    const currentOwner = ((roomOwner === currentId) ? true : false);

    return (
        <Button style={styles.buttonStyle}
          onPress={() => {
            exitRoom({ 
              variables: { 
                room: {
                  idRoom : this.props.roomObj.idRoom,
                  idOwner : Store.getState().currentUser.id
                }
              }
            })
            this.setState({exitRoom: true});
          }}
        ><Text style={{ color: '#fff' }}>{currentOwner ? 'Delete': 'Get out from' } {this.props.roomObj.nameRoom}</Text>
        
        </Button>
    )
  };

  onExitRoom(data){
    return (
      <Spinner />
    )
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.exitRoom){
      this.props.navigation.navigate('Lobby');
    }
  }

  render(){
    return (
      <Mutation 
        mutation={EXIT_ROOM_MUTATION} 
      >
        {(exitRoom, { loading, error, data }) => (
          <View>
          {(data ? this.onExitRoom(data) : this.onForm(exitRoom))}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }
}


const styles = StyleSheet.create({
  container: {
  },

  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  formElement: {
    height: 70,
  },

  buttonStyle:{
    width: Dimensions.get('screen').width,
    backgroundColor: '#26d3cd',
    justifyContent: 'center'
  }
});