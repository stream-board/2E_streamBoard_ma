import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Store from './../../reduxConfig';

import BoardSocket from './BoardSocket';

export default class Board extends Component {
    render(){
        const { roomId } = this.props;
        const userNick = Store.getState().currentUser.nickname;
        const userId = Store.getState().currentUser.id;
        
        return (   
            <View style={styles.boardContainer}>
                <BoardSocket 
                    roomId={roomId}
                    userNick={userNick}
                    userId={userId}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boardContainer: {
        backgroundColor: 'skyblue',
    },
})