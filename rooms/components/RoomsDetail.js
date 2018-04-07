import React, { Component } from 'react';
import {
    Spinner,
    Container,
    Header,
    Content,
    Form,
    Item,
    Input
  } from 'native-base';

import Chat from './../../chat/components/Chat';

export default class RoomsDetail extends Component {
    render() {
        const roomId = this.props.roomId;
        return (
            <Content>
                <Chat roomId={roomId}/>
            </Content>
        )
    }
}