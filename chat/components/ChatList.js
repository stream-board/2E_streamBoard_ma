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

function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

export class ChatList extends Component {
  render() {
    const { chatMessageList } = this.props;
    const currentUser = Store.getState().currentUser.id;
    return (
      <View>
        {chatMessageList.map(({ id, message, user_id}, index) => (

            <View key={index} style={styles.messageOwner}>
              <Text style={styles.textOwner}>User: {user_id}</Text>
              <Text style={styles.textOwner}>Msg: {message}</Text>
            </View>
          )
        )}
      </View>
    )
  }
}

export default connect(mapStateToProps)(ChatList);

const styles = StyleSheet.create({
  messageOwner: {
    //alignSelf: "self-end",
    backgroundColor: '#174557',
    width: 320,
    margin: 5,
    borderRadius: 10,
  },
  messageOther: {
    backgroundColor: '#E0E0E0',
    width: 320,
    margin: 5,
    borderRadius: 10,
  },
  textOwner:{
    textAlign: "right",
  },
  textOther:{
    textAlign: "left",
  }
})