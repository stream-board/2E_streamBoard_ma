import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';

import SocketIOClient from 'socket.io-client';

import
  serverIp,
  port,
  entryPoint
} from './../Server';


export default class BoardSocket extends Component {
  construct(props) {
    super(props);
    this.socket = SocketIOClient(`http://${serverIp}:${port}`);
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
