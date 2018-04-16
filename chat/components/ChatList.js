import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem,
    Text,
    Thumbnail,
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import { Query } from 'react-apollo';
import { CHAT_MESSAGE_LIST_QUERY } from './../TypesDef';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    chatMessageList: state.chatMessageList,
});

function renderIf(condition, condition2, content, alterContent) {
    if (condition === condition2) {
        return content;
    } else {
        return alterContent;
    }
}

function existPhoto(user_id , content, alterContent){
  if(Store.getState().roomParticipants[user_id]){
  return <Thumbnail source={{uri: Store.getState().roomParticipants[user_id].image}} />;
  }else{
    return alterContent; 
  }
}

export class ChatList extends Component {
  render() {
    const { chatMessageList } = this.props;
    const currentUser = Store.getState().currentUser.id;
    console.log(currentUser);
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    console.log(Store.getState().currentUser);
    return (
      <View style={styles.chatContainer}>
        {chatMessageList.map(({ id, message, user_id, name}, index) => (
          renderIf(currentUser,user_id, 
            <Grid key={index}>
              <Col size={35}>

              </Col>
              <Col size={45} style={styles.messageOwner}>
                <Text style={styles.textOwner}>{name}</Text>
                <Text style={styles.textOwner}>{message}</Text>
              </Col>
              <Col size={20}>
                <Thumbnail source={{uri: Store.getState().currentUser.image}} />
              </Col>
            </Grid>
          ,
          
            <Grid key={index}>
              <Col size={17}>
              {
                existPhoto(
                  user_id, 
                  <Thumbnail source={{uri: Store.getState().roomParticipants[user_id]}} />,
                  <Thumbnail source={{uri: uri}} />
                )
              }
              </Col>
              <Col size={48} style={styles.messageOther}>
                <Text style={styles.textOther}>{name}</Text>
                <Text style={styles.textOther}>{message}</Text>
              </Col>
              <Col size={35}>

              </Col>
            </Grid>
          )
        ))}
      </View>
    )
  }
}

export default connect(mapStateToProps)(ChatList);

const styles = StyleSheet.create({
  messageOwner: {
    backgroundColor: '#174557',
    margin: 5,
    borderRadius: 8,
    padding: 5,
  },
  messageOther: {
    backgroundColor: '#E0E0E0',
    margin: 5,
    borderRadius: 8,
    padding: 5,
  },
  textOwner:{
    textAlign: "right",
    color: 'white',
  },
  textOther:{
    textAlign: "left",
  },
  chatContainer: {
    flex: 1,
    width: Dimensions.get('screen').width
  }
})