import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { BoardCreateRoomMutation } from './../TypesDef'
import { Mutation } from 'react-apollo';

export const BoardRoomCreate = () => {

    let input = {
      id: 100,
      admin: 'AdminTest'
    };

    return (
      <Mutation mutation={BoardCreateRoomMutation}>
        {(createBoardRoom, { data }) => (
          <View>
            {console.log(data)}
            <Button
              onPress={() => {
                createBoardRoom({ variables: { room: input } })
              }}
              title="Create BoardRoom with 59"
              color="#841584"
            />
          </View>
        )}
      </Mutation>
    )
  }
