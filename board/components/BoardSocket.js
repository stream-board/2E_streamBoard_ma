import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
  PanResponder
} from 'react-native';

import SocketIOClient from 'socket.io-client';

import {
  serverIp,
  port,
  entryPoint
} from './../Server';

import Canvas from 'react-native-canvas';


export default class BoardSocket extends Component {
  constructor(props) {
    super(props);

    const defaultLineColor = '#000000';
    const defaultLineThickness = 3;

    this.state = {
      isAllowed: false,
      isPenDown: false,
      selectedColor: defaultLineColor,
      selectedThinckness: defaultLineThickness,
      context: '',
      hasTouch: false,
      localPen: {}
    }

    const { roomId, userNick, userId } = this.props;

    const url = `http://${serverIp}:${port}?room=${roomId}&nick=${userNick}&id=${userId}`;
    this.$socket = SocketIOClient(url);
    this.$canvas = { height: 700, width: 320 };
    this.resetPermissions = this.resetPermissions.bind(this);
    this.onResetBoard = this.onResetBoard.bind(this);
    this.onLostPermission = this.onLostPermission.bind(this);
    this.onSetAdmin = this.onSetAdmin.bind(this);
    this.onAskForBoard = this.onAskForBoard.bind(this);
    this.onAnswerForBoard = this.onAnswerForBoard.bind(this);
    this.onHostLeft = this.onHostLeft.bind(this);
    this.onDraw = this.onDraw.bind(this);

    this.penDown = this.penDown.bind(this);
    this.penMove = this.penMove.bind(this);
    this.penUp = this.penUp.bind(this);

    this.drawPath = this.drawPath.bind(this);

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

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        console.log(this.$canvas);
        let touchX = gestureState.x0 - this.$canvas.offsetLeft;
        let touchY = gestureState.y0 - this.$canvas.offsetTop;
        if(!this.state.isPenDown) {
          this.penDown(touchX, touchY);
        }
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        this.penMove();
        // The most recent move distance is gestureState.move{X,Y}
        //console.log(gestureState);
        
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState);
        this.penUp();
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
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

  onDraw() {

  }
  
  onAnswerForBoard(data) {
    if(data) {
      this.setState({isAllowed: false})
    }
  }

  resetPermissions() {
    this.$socket.emit('resetBoard');
  }

  askForTurn() {
    this.$socket.emit('aksForBoard');
  }

  onHostLeft() {
  }

  initCanvas = (canvas) => {
    console.log(canvas);
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.fillStyle = "blue";
    canvas = Object.assign(canvas, this.$canvas);
    this.$canvas = Object.assign({}, canvas);;
    
  }

  penDown(x, y) {
    this.drawPath(this.state.selectedColor, this.state.selectedThinckness, 'start', x, y);
  }

  penMove(x, y) {

  }

  penUp(x, y) {

  }

  drawPath(color, thinckness, type, x, y) {
    context = this.state.context;
    context.strokeStyle = color;
    context.lineWidth = thinckness;

    switch (type) {
      case 'start':
        context.beginPath();
        context.moveTo(x, y);
        break
      case 'move':
        context.lineTo(x, y);
        context.stroke();
        break
      case 'end':
        context.closePath();
        break
    }
    this.setState({ context: context });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Canvas ref={this.initCanvas} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00FFFF',
    padding: 16,
    flex: 1
  }
})
