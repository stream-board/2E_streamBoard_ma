
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
import { DELETE_ROOM_MUTATION, ALL_ROOMS_QUERY } from './../TypesDef'

import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';

export default class RoomDelele extends Component {
  constructor(props) {
    super(props);

    this.state = { deleteRoom: false };
    this.onForm = this.onForm.bind(this);
    this.onDeleteRoom = this.onDeleteRoom.bind(this);
  }

  onForm(deleteRoom) {
    const roomOwner = this.props.roomObj.owner.id;
    const currentId = Store.getState().currentUser.id;

    return (
        <Button style={styles.buttonStyle}
          onPress={() => {
            deleteRoom({ 
              variables: { 
                room: {
                  idRoom : this.props.roomObj.idRoom,
                  idOwner : Store.getState().currentUser.id
                }
              }
            })
            this.setState({deleteRoom: true});
            this.props.closeRoom();
          }}
        ><Text style={{ color: '#fff' }}> Delete {this.props.roomObj.nameRoom}</Text>
        
        </Button>
    )
  };

  onDeleteRoom(data){
    return (
      <Spinner />
    )
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    if(this.state.deleteRoom){
      this.props.navigation.navigate('Lobby');
    }
  }

  render(){
    return (
      <Mutation 
        mutation={DELETE_ROOM_MUTATION}
        update={(cache, { data: data })=>{
         let roomDeleted = data.deleteRoom;
        
         const dataList = cache.readQuery({
           query: ALL_ROOMS_QUERY
         });
         const roomListCurrent = dataList.allRooms.filter((room)=> room.idRoom !== roomDeleted.idRoom);
         
         cache.writeQuery({
           query: ALL_ROOMS_QUERY,
           data: {
             allRooms: roomListCurrent,
           },
         })
       }}  
      >
        {(deleteRoom, { loading, error, data }) => (
          <View>
          {(data ? this.onDeleteRoom(data) : this.onForm(deleteRoom))}
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