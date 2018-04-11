import React, { Component } from 'react';
import { View } from "react-native";
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

import Chat from './../../chat/components/Chat';
import { Query } from 'react-apollo';
import { ROOM_BY_ID_QUERY } from "./../TypesDef";
import ChatWebsocket from '../../chat/components/ChatWebsocket';

import Store from "./../../reduxConfig";
import { roomActionCreators } from "./../roomsRedux";


const RoomDetailQuery = ({ roomId, children }) => (
    <Query query={ROOM_BY_ID_QUERY} variables={{ id: roomId }}>
    {result => {
        const { loading , error, data } = result;
        return children({
            loading,
            error,
            room: data && data.roomById,
        });
    }}
    </Query>   
);

const RoomDetail = ({ loading, error, room }) => {
    if(loading) {
        return <Spinner />;
    }
    if (error) {
        return <Text>ERROR</Text>;
    }
    if(room) {
        Store.dispatch(roomActionCreators.addRoomParticipantList(room.Participants));
    }
    return (
        <View>
            {room && (
                <View>
                    <Chat roomId={room.idRoom} />
                </View>
            )}
        </View>
    )
}

export default class RoomsDetail extends Component {
    constructor(props) {
        super(props);
        
        const { roomId } = this.props.navigation.state.params;        
        this.state = {
            roomId: roomId
        }
    }

    render() {
        return (
            <RoomDetailQuery roomId={this.state.roomId}>
                {result => <RoomDetail {...result} />}
            </RoomDetailQuery>
        );
    }   
}