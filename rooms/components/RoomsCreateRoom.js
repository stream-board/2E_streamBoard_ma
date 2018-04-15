import React , { Component }from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { ROOMS_CREATE_ROOM_MUTATION } from './../TypesDef'
import { ALL_ROOMS_QUERY } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import {
  Spinner,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title
} from 'native-base';
import { connect } from 'react-redux';
import { roomActionCreators } from "./../roomsRedux";

const mapStateToProps = (state) => ({
  queryParams: state.queryParams,
})

export class RoomsCreateRoom extends Component{
  constructor(props){
    super(props);
    this.onForm = this.onForm.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
  }

  onForm(createRoom){
    return (
      <View style={{flex:1}}>
      <Item floatingLabel style={styles.formElement}>
      <Label>Room Name</Label>
        <Input
        onChangeText= {(text)=>{
          Store.dispatch(roomActionCreators.addRoomName(text));
        }}
        />
      </Item>

      <Item floatingLabel style={styles.formElement}>
      <Label>Description</Label>
        <Input
          onChangeText= {(text)=>{
            Store.dispatch(roomActionCreators.addRoomDescription(text));
          }}
        />
      </Item>

      <Item floatingLabel style={styles.formElement}>
        <Label>Category</Label>
          <Input
          onChangeText= {(text)=>{
            Store.dispatch(roomActionCreators.addRoomCategory(text));
          }}
        />
      </Item>

      <Item floatingLabel style={styles.formElement}>
      <Label>ID owner</Label>
        <Input
          onChangeText= {(userId)=>{
            Store.dispatch(roomActionCreators.addRoomOwner(userId));
          }}
        />
      </Item>
        <Button
          onPress={() => {
            createRoom({ 
              variables: { 
                room: Store.getState().roomCreateParams 
              }
            })
          }}
          title="Create Room"
          color="#841584"
        />
      </View>
    )
  };

  onCreateRoom(data){
    console.log(data);
    return (
      <View>
        <Text>Redirección RoomDetail</Text>
      </View>
    )
  };

  render(){
    return (
      <Mutation 
        mutation={ROOMS_CREATE_ROOM_MUTATION}
        update={(cache, { data: data })=>{
          let newRoom = data.createRoom;

          const dataList = cache.readQuery({
            query: ALL_ROOMS_QUERY
          });
          cache.writeQuery({
            query: ALL_ROOMS_QUERY,
            data: {
              allRooms: [...dataList.allRooms, newRoom],
            },
          })
        }}  
      >
        {(createRoom, { loading, error, data }) => (
          <View>
          {(data ? this.onCreateRoom(data) : this.onForm(createRoom))}  
          {loading && <Spinner />}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }
}

export default connect(mapStateToProps)(RoomsCreateRoom)

const styles = StyleSheet.create({
  formElement: {
      height: 70,
      width: 350,
      alignSelf: 'center',
      marginTop: 30,
    },

}

  )