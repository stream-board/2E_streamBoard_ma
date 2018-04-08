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
    this.$socket = SocketIOClient(url);

    this.resetPermissions = this.resetPermissions.bind(this);
    this.onResetBoard = this.onResetBoard.bind(this);
    this.onLostPermission = this.onLostPermission.bind(this);
    this.onSetAdmin = this.onSetAdmin.bind(this);
    this.onAskForBoard = this.onAskForBoard.bind(this);
    this.onAnswerForBoard = this.onAnswerForBoard.bind(this);
    this.onHostLeft = this.onHostLeft.bind(this);
    this.onDraw = this.onDraw.bind(this);

    this.$socket.on('connect', () => {
      console.log('Connected');
      console.log(this.socket);
    });
    this.$socket.on('resetBoard', this.onResetBoard);
    this.$socket.on('lostPermission', this.onLostPermission);
    this.$socket.on('admin', this.onSetAdmin);
    this.$socket.on('askForBoard', this.onAskForBoard);
    this.$socket.on('answerForBoard', this.onAnswerForBoard);
    this.$socket.on('hostLeft', this.onHostLeft);
    this.$socket.on('draw', this.onDraw);
  }

  componentDidMount() {
  }

  onLostPermission(data) {
    console.log('se ha reseteado');
    //Modals
  }

  onResetBoard(data) {
    console.log('Rset board');
    //Modals
  }

  onSetAdmin(data) {
    //hide actions
    this.setState({isAllowed: true});
  }

  onAskForBoard(data) {
    //modal 
  }

  onAnswerForBoard(data) {
    if(data) {
      this.setState({isAllowed: false})
    }
  }

  resetPermissions() {
    this.$socket.emit('resetBoard');
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
