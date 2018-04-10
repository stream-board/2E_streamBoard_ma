import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem 
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
                    <View key={index}>
                        <Text>{message}</Text>
                        <Text>{user_id}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

export default connect(mapStateToProps)(ChatList);
