import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';
import Store from './../../reduxConfig';
import { actionCreators } from './../../rooms/roomsRedux';
import ChatList from './ChatList';
import ChatWebsocket from './ChatWebsocket';

const mapStateToProps = (state) => ({
  chatMessageList: state.chatMessageList,
});

export default ({ roomId: currentId }) => (
  <Query query={CHAT_MESSAGE_LIST_QUERY} variables={{ id: currentId }}>
    { ({ loading, error, data }) => {
        if (loading) return <ActivityIndicator />;
        if (error) return <Text>{`Error: ${error}`}</Text>;
        if (data) {
          Store.dispatch(actionCreators.addChatMessageList(data.chatMsgByRoomId));
        }
        return (
          <View>
            <ChatList />
            <ChatWebsocket roomId={currentId}/>
          </View>
        )
      }
    }
  </Query>
);

//export default connect(mapStateToProps)(ChatMessageList)
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
