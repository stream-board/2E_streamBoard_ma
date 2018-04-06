import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';

import {
  Spinner,
  Container,
  Header,
  Content,
  Form,
  List,
  ListItem
} from 'native-base';

import { Query } from 'react-apollo';
import { ALL_ROOMS_QUERY } from './../TypesDef';
import { RoomsCreateRoom } from './RoomsCreateRoom';


export default () => (
  <Query query={ALL_ROOMS_QUERY}>
    {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Text>{`Error: ${error}`}</Text>;
         return (
          <View>
            {data.allRooms.map(({ idRoom, nameRoom, owner }, index) => (
              <View key={index} style={styles.messageContainer}>
                <Text style={styles.message}>{idRoom}</Text>
                <Text style={styles.sender}>{nameRoom}</Text>
                <Text style={styles.sender}>{owner.name}</Text>
              </View>
            ))}
          </View>
        )
      }
    }
  </Query>
);

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#00FFFF',
    padding: 16,
  },

  message: {
    color: '#FFFAF0',
  },

  sender: {
    color: '#FF1493',
  },
})
