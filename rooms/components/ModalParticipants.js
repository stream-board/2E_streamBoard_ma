import React, { Component } from "react";
import { Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ColorPicker } from 'react-native-color-picker';
import { Fab, Icon, Button, View, Spinner } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { PARTICIPANTS_BY_ID_QUERY, PARTICIPANT_JOINED } from './../TypesDef';
import RoomsParticipants from './RoomsParticipants';
import Store from './../../reduxConfig';
import { roomActionCreators } from './../roomsRedux';
import { Query } from 'react-apollo';

export default class ParticipantsModal extends Component {
  constructor(props){
      super(props);
      this.state = {
        isModalVisible: false,
        active: 'true',
      };
      this._toggleModal = this._toggleModal.bind(this);
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <Query query={PARTICIPANTS_BY_ID_QUERY} fetchPolicy={'network-only'} variables={{id: this.props.roomId}}>
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) return (<Spinner />);
      if (error) return (<Text>{`Error: ${error}`}</Text>);
        return (
          <RoomsParticipants
            data={data}
            navigation={this.props.navigation}
            roomId={this.props.roomId}
            subscribeToJoinedParticipants={() => {
              subscribeToMore({
                document: PARTICIPANT_JOINED,
                variables: { roomId: this.props.roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if(!subscriptionData.data) return prev;
                  console.log(`subs ${prev}`);
                  Store.dispatch(roomActionCreators.addRoomParticipant(subscriptionData.data.participantJoined));
                  let newList = prev.participantsById.slice(0);
                  console.log('hola');
                  newList.push(subscriptionData.data.participantJoined);
                  let result = { participantsById: newList };
                  return result;
                }
              })
            }}
          />
        )
      }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
    colorWheel: {
        width: Dimensions.get('window').width
    },
    thumbStyle: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    settingBtn: {
        backgroundColor: '#174557',
    },
    toolBtn: {
        backgroundColor: '#26d3cd',
    },
    shapeBtn:{
        backgroundColor: '#0a8b88',
        borderRadius: 10,
    },
    exitButton: {
        backgroundColor: 'transparent',
    },
    containerExit: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});