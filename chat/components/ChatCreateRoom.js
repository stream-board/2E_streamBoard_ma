import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { ChatRoomCreateMutation } from './../TypesDef'
import { Mutation } from 'react-apollo';

export const ChatRoomCreate = () => {
    let input = {
      id: 69
    };

    return (
      <Mutation mutation={ChatRoomCreateMutation}>
        {(createChatRoom, { data }) => (
          <View>
            {console.log(data)}
            <Button
              onPress={() => {
                createChatRoom({ variables: { chatRoom: input } })
              }}
              title="Create Room with id 100"
              color="#841584"
            />
          </View>
        )}
      </Mutation>
    )
  }
