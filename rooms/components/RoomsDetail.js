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

import Chat from './../../chat/components/Chat';
import { Query } from 'react-apollo';
import { ROOM_BY_ID_QUERY } from "./../TypesDef";
import ChatWebsocket from '../../chat/components/ChatWebsocket';

import Store from "./../../reduxConfig";
import { roomActionCreators } from "./../roomsRedux";
import RoomExit from "./RoomsExit";
import { Constants } from 'expo';

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
        <Tabs locked={true}>
            <Tab heading="Chat">
                {room && (
                    <View>
                        <Chat roomId={room.idRoom} />
                    </View>
                )}
            </Tab>
            <Tab heading="Board">
                <ScrollView style={styles.container}>
                    <ScrollView horizontal>
                    <View style={styles.boxSmall} />
                    </ScrollView>
                </ScrollView>
            </Tab>
        </Tabs>
    )
}

export default class RoomsDetail extends Component {
    constructor(props) {
        super(props);
        
        const { roomId } = this.props.navigation.state.params;        
        this.state = {
            roomId: roomId,
            navigation: this.props.navigation
        }
    }

    render() {
        return (
            <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <RoomDetailQuery roomId={this.state.roomId}>
                    {result => <RoomDetail {...result} />}
                </RoomDetailQuery>
                <RoomExit roomId={this.state.roomId} navigation={this.props.navigation}/>
            </Container>
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
