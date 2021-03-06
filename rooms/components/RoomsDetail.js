import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform,} from "react-native";
import {
    Spinner,
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Text,
    Tabs,
    Tab,
  } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Chat from './../../chat/components/Chat';
import { Query } from 'react-apollo';
import { ROOM_BY_ID_QUERY } from "./../TypesDef";
import ChatWebsocket from '../../chat/components/ChatWebsocket';

import Store from "./../../reduxConfig";
import { roomActionCreators } from "./../roomsRedux";
import RoomExit from "./RoomsExit";
import RoomDelete from './RoomsDelete';
import { Constants } from 'expo';
import Board from './../../board/components/Board';
import ParticipantsModal from './ModalParticipants';

const RoomDetailQuery = ({ roomId, navigation, closeRoom, roomClosed, children }) => (
    <Query query={ROOM_BY_ID_QUERY} variables={{ id: roomId }}>
    {result => {
        console.log(navigation);
        const { loading , error, data } = result;
        return children({
            loading,
            error,
            room: data && data.roomById,
            navigation: navigation,
            closeRoom: closeRoom,
            roomClosed: roomClosed,
        });
    }}
    </Query>   
);

const RoomDetail = ({ loading, error, room, navigation, closeRoom, roomClosed }) => {
    if(loading) {
        return <Spinner />;
    }
    if (error) {
        return <Text>ERROR</Text>;
    }
    if(room) {
        Store.dispatch(roomActionCreators.addRoomParticipantList(room.Participants));
    }
    const currentUserId = Store.getState().currentUser.id;
    const currentOwner = ((room.owner.id === currentUserId) ? true : false);
    
    return (
        <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
        <Tabs locked={true} tabBarUnderlineStyle={{borderBottomWidth:2}}>
            <Tab heading="Chat" tabStyle={{backgroundColor: '#174557'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#174557'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
                {room && ( <Chat roomId={room.idRoom} roomClosed={roomClosed}/>
                )}
            </Tab>
            <Tab heading="Board" tabStyle={{backgroundColor: '#174557'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#174557'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
                <Board roomId={room.idRoom} roomOwner={room.owner.id} roomClosed={roomClosed}/>
            </Tab>
            {
                currentOwner 
                && <Tab heading="Participants" tabStyle={{backgroundColor: '#174557'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#174557'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
                    <ParticipantsModal roomId={room.idRoom}/> 
                </Tab> 
            }
            </Tabs>
            {currentOwner ? <RoomDelete roomObj={room} navigation={navigation} closeRoom={closeRoom}/>: <RoomExit roomObj={room} navigation={navigation} closeRoom={closeRoom} />}
        </Container>
    )
}

export default class RoomsDetail extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params);
        const { roomId } = this.props.navigation.state.params;
        this.state = {
            roomId: roomId,
            navigation: this.props.navigation,
            close: false
        }
        this.closeRoom = this.closeRoom.bind(this);
    }
    
    closeRoom(){
        this.setState({ close: true });
    }
    render() {
        console.log("idroom ingresado en roomdetails");
        console.log(this.state.roomId);
        return (
            <RoomDetailQuery roomId={this.state.roomId} navigation={this.props.navigation} closeRoom={this.closeRoom} roomClosed={this.state.close}>
                {result => <RoomDetail {...result} />}
            </RoomDetailQuery>
        );
    } 

}

const styles = StyleSheet.create({

  boxSmall: {
    width: 2000,
    height: 2000,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'skyblue',
  },
})
