import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button
} from 'react-native';

import { Mutation } from 'react-apollo';

import { ChatRoomCreateMutation } from './../TypesDef';


const ChatRoomCreate = ({ chatRoomInput: currentChatRoom }) => {
  return (
    <Mutation mutation={ChatRoomCreateMutation} variables={ {chatRoom: currentChatRoom}}>
      {(ChatRoomCreate, { data }) => (

        <Button
          onPress={() => console.log('Press')}
          title="Create Room with id 100"
          color="#841584"
        />
      )}
    </Mutation>
  )
}

export default ChatRoomCreate;
