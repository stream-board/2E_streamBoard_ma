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

const mapStateToProps = (state) => ({
  chatMessageList: state.chatMessageList,
});

class chatMessageList extends Component {
  componentWillMount() {
  } 

  render() {
    return (
    <Query query={CHAT_MESSAGE_LIST_QUERY} variables={{ id: this.props.roomId }}>
      { ({ loading, error, data }) => {
          if (loading) return <ActivityIndicator />;
          if (error) return <Text>{`Error: ${error}`}</Text>;
          if(data){
            Store.dispatch(actionCreators.addChatMessageList(data.chatMsgByRoomId));
          }
          
          return (
            <View>
            </View>
          )
        }
      }
    </Query>
    )
  }
}
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
