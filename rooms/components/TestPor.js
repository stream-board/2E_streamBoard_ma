import React from 'react';
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
  Input
} from 'native-base';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  queryParams: state.queryParams,
})

export const RoomCreateRoom = () => {
    onAddRoom = (room) => {
      const {dispatch} = this.props

      dispatch(actionCreators.add(room))
    }

    onRemoveRoom = (index) => {
      const {dispatch} = this.props

      dispatch(actionCreators.remove(index))
    }
    

    return (
      <Mutation 
        mutation={ROOMS_CREATE_ROOM_MUTATION}
        update={(cache, { data: data })=>{
          let newRoom = data.createRoom;
          
          const { allRooms } = cache.readQuery({
            query: ALL_ROOMS_QUERY
          });
          cache.writeQuery({
            query: ALL_ROOMS_QUERY,
            allRooms: { allRooms: allRooms.concat([newRoom]) }
          })
        }}  
      >
        {(createRoom, { loading, error, data }) => (
          <View> 
              <Input
                placeholder='Room name'
                onChangeText= {(text)=>{
                  Store.dispatch( { type:'addRoomName', payload: text })
                }}
              />
              <Input
                placeholder='Description'
                onChangeText= {(text)=>{
                  Store.dispatch( { type:'addRoomDescription', payload: text })
                }}
              />
              <Input
                placeholder='ID OWNER'
                onChangeText= {(text)=>{
                  Store.dispatch( { type:'addRoomOwner', payload: Number(text) })
                }}
              />
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
            {loading && <Spinner />}
            {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }

export default connect(mapStateToProps)(RoomCreateRoom)