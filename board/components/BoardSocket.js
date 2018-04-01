import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button
} from 'react-native';

import SocketIOClient from 'socket.io-client';

import {
  serverIp,
  port,
  entryPoint
} from './../Server';


export default class BoardSocket extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAllowed: false,
      isPenDown: false
    }

    const url = `http://${serverIp}:${port}?room=1&nick=usertest&id=usertest`;
    console.log(url);
    this.socket = SocketIOClient(url);

    this.registerSocketListeners = this.registerSocketListeners.bind(this);
    this.resetPermissions = this.resetPermissions.bind(this);

    this.socket.on('connect', () => {
      console.log('Connected');
      console.log(this.socket);
    });
    this.socket.on('resetBoard', (data) => {
      console.log('Hola');
    });
  }

  componentDidMount() {
  }

  registerSocketListeners() {
    //TODO



  }

  aksForBoard() {

  }

  resetPermissions() {
    console.log(this.socket);
    this.socket.emit('resetBoard');
  }

  render() {
    const { isAllowed, isPenDown } = this.state;

    return (
      <View>
        <Button
          onPress={this.resetPermissions}
          title="Reset permissions"
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#00FFFF',
    padding: 16,
  },

  message: {
    color: '#FFFAF0',
  },

  sender: {
    color: '#FF1493',
  },
})
