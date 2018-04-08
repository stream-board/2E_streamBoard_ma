import React, { Component } from "react";
import { Text, View, StyleSheet } from 'react-native';

import BoardSocket from './BoardSocket';

export default class Board extends Component {
    render(){
        const { roomId, userNick, userId } = this.props;
        return (   
            <View>
                <BoardSocket 
                    roomId={roomId}
                    userNick={userNick}
                    userId={userId}
                />
            </View>
        )
    }
}