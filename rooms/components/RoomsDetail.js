import React, { Component } from 'react';
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

export default class RoomsDetail extends Component {

    render() {
        const roomId = this.props.navigation.state.params.roomId;
        return (
                <Tabs locked={true} >
                    <Tab heading="Chat">
                        <Chat roomId={roomId}/>
                    </Tab>
                    <Tab heading="Board">
                        <Spinner />
                    </Tab>
                    <Tab heading="Video">
                        <Spinner />
                    </Tab>
                </Tabs>
        )
    }
}