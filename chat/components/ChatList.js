import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem,
    Text
} from 'native-base';

import { Query } from 'react-apollo';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    chatMessageList: state.chatMessageList,
});

export class ChatList extends Component {
  render() {
    const { chatMessageList } = this.props;
    return (
      <View>
        {chatMessageList.map(({ id, message, user_id}, index) => (
            <View key={index} style={styles.messageOwn}>
              <Text>User: {user_id}</Text>
              <Text>Msg: {message}</Text>
            </View>
          ))}
      </View>
    )
  }
}

export default connect(mapStateToProps)(ChatList);

const styles = StyleSheet.create({
  messageOwn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CE882',
    width: 320,
    margin: 5,
    borderRadius: 10,
  },
})