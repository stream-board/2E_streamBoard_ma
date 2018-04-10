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
    }

    render() {
        return (
            <RoomDetailQuery roomId={this.props.roomId}>
                {result => <RoomDetail {...result} />}
            </RoomDetailQuery>
        );
    }   
}