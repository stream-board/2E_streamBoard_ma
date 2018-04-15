import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { Container, Content, Footer} from "native-base"

import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';
import Store from './../../reduxConfig';
import { chatActionsCreators } from './../../chat/chatRedux';
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
          Store.dispatch(chatActionsCreators.addChatMessageList(data.chatMsgByRoomId));
        }
        return (
          <View style={{flex:1}}>
            <Container>
              <Content //style={{backgroundColor:'red'}}
              >
                <ChatList />
              </Content>
              <Footer style={styles.chatElement}>
                <ChatWebsocket roomId={currentId} />
              </Footer>
            </Container>
          </View>
        )
      }
    }
  </Query>
);

//export default connect(mapStateToProps)(ChatMessageList)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chatElement:{
    height: 55,
  }
})
