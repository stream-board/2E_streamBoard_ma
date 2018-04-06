import React from 'react';
import { Mutation } from 'react-apollo';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import {
  Spinner,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input
} from 'native-base';
import { connect } from 'react-redux'

import RoomDetail from  './RoomDetail';
import { ROOMS_CREATE_ROOM_MUTATION, ALL_ROOMS_QUERY } from './../TypesDef'

const mapStateToProps = (state) => ({
  allRooms: state.allRooms,
})

export const RoomsCreateRoom = () => {
    onAddRoom = (room) => {
      const {dispatch} = this.props

      dispatch(actionCreators.add(room))
    }

    onRemoveRoom = (index) => {
      const {dispatch} = this.props

      dispatch(actionCreators.remove(index))
    }
    
    let input = {
      idOwner: 1,
      nameRoom: 'Sala creada desde mobile'
    };

    let userNick;
    let nameRoom;
    let descriptionRoom;

    return (
      <Mutation mutation={ROOMS_CREATE_ROOM_MUTATION}
        update={(cache, { data: { createRoom }}) => {
          const { allRooms } = cache.readQuery({ query: ALL_ROOMS_QUERY });
          cache.writeQuery({
            query: ALL_ROOMS_QUERY,
            allRooms: { allRooms: allRooms.concat([createRoom]) }
          });
        }}
      >
        {createRoom => (
            <View>
              <Content>
                <Item>
                  <Input
                    placeholder='Room name'
                    ref={ name => { nameRoom = name } }
                  />
                </Item>
                <Item>
                  <Input
                    placeholder='Description'
                    ref={ description => { descriptionRoom = description } }
                  />
                </Item>
                <Button
                  onPress={() => {
                    createRoom({
                      variables: {
                        room: {
                            idOwner: 1,
                            nameRoom: nameRoom,
                            descriptionRoom: descriptionRoom
                        }
                      }
                    })
                  }}
                  title="Create room"
                  color="#841584"
                />
              </Content>
            </View>
            )}
      </Mutation>
    )
  }

  export default connect(mapStateToProps)(RoomsCreateRoom)