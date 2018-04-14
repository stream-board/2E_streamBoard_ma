import React, { Component } from "react";

import { JOIN_ROOM_MUTATION } from "./../TypesDef";
import { Mutation } from "react-apollo";

import Store from "./../../reduxConfig";
import { roomActionCreators } from "./../roomsRedux";
import { View, Text } from "native-base";

const RoomJoinMutation = ({ roomObj, children }) => (
    <Mutation mutation={JOIN_ROOM_MUTATION}>
        {(joinRoom, { loading, error, data }) => {
            joinRoom({
                variables: {
                    room: roomObj
                }
            });
            return children({
                loading,
                error,
                room: data && data.joinRoom
            })
        }}
    </Mutation>
);

const RoomJoinRedirection = ({ loading, error, room }) => {
    if(loading) {
        return <Spinner />;
    }
    if (error) {
        return <Text>ERROR</Text>;
    }
    if(room) {
        const currentUser = Store.getState().currentUser;
        Store.dispatch(roomActionCreators.addRoomParticipant(currentUser));
    }
    console.log(Store.getState().roomParticipants);
    return (
        <View>
            <Text>Redirección a room detail</Text>
        </View>
    );
}

export default class RoomsJoin extends Component {
    constructor(props) {
        super(props);
        
        const { roomId } = this.props.navigation.state.params;
        const currentUserId = Store.getState().currentUser.id;        
        this.state = {
            idRoom: roomId,
            idOwner: currentUserId
        }
    }

    render() {
        return (
            <RoomJoinMutation roomObj={this.state}>
                {(joinRoom, result) => <RoomJoinRedirection {...result} />}
            </RoomJoinMutation>
        );
    }   
}