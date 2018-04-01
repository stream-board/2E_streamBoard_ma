import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';

import { Query } from 'react-apollo';
import { ChatMessageListQuery } from './../TypesDef';


export default ({ roomId: currentId }) => (
  <Query query={ChatMessageListQuery} variables={{ id: currentId }}>
    { ({ loading, error, data }) => {
        if (loading) return <ActivityIndicator />;
        if (error) return <Text>{`Error: ${error}`}</Text>;
        return (
          <View>
            {data.chatMsgByRoomId.map(({ message, sender }, index) => (
              <View key={index} style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.sender}>{sender}</Text>
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
