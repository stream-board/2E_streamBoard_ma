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

    const { roomId, userNick, userId } = this.props;

    const url = `http://${serverIp}:${port}?room=${roomId}&nick=${userNick}&id=${userId}`;
    console.log(url);
    this.socket = SocketIOClient(url);

    this.registerSocketListeners = this.registerSocketListeners.bind(this);
    this.resetPermissions = this.resetPermissions.bind(this);
    this.onResetBoard = this.onResetBoard.bind(this);
    this.onLostPermission = this.onLostPermission.bind(this);

    this.socket.on('connect', () => {
      console.log('Connected');
      console.log(this.socket);
    });
    this.socket.on('resetBoard', this.onResetBoard);
    this.socket.on('lostPermission', this.onLostPermission);
  }

  componentDidMount() {
  }

  registerSocketListeners() {
    //TODO
  }

  onLostPermission(data) {
    console.log('se ha reseteado');
  }

  onResetBoard(data) {
    console.log('Rset board');
  }

  resetPermissions() {
    console.log('Hola');

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
