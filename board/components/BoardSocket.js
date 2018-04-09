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

import Canvas, {Image as CanvasImage, Path2D} from 'react-native-canvas';


export default class BoardSocket extends Component {
  constructor(props) {
    super(props);

    const defaultLineColor = '#000000';
    const defaultLineThickness = 3;

    const { roomId, userNick, userId } = this.props;

    const url = `http://${serverIp}:${port}?room=${roomId}&nick=${userNick}&id=${userId}`;
    this.$socket = SocketIOClient(url);
    this.broadcastPath = this.broadcastPath.bind(this);
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
    this.initCanvas = this.initCanvas.bind(this);
    this.$socket.on('connect', () => {
      console.log('Connected');
      console.log(this.socket);
    });

    this.state = {
      isAllowed: true,
      isPenDown: false,
      canvasDidSet: false,
      selectedColor: defaultLineColor,
      selectedThickness: defaultLineThickness,
      canvas: <Canvas ref={this.initCanvas} />,
      context: '',
      hasTouch: false,
      localPen: {}
    }
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
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
      onPanResponderGrant: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.x0 - 25;
        let touchY = gestureState.y0 - 95;
        if(!this.state.isPenDown) {
          this.penDown(canvas, context, touchX, touchY);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX - 25;
        let touchY = gestureState.moveY - 95;
        this.penMove(canvas, context, touchX, touchY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX - 25;
        let touchY = gestureState.moveY - 95;
        this.penUp(canvas, context, touchX, touchY);
      },
    });
  }
  componentDidMount() {
    console.log('did Mount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  initCanvas = (canvas) => {
    const context = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 320;
    context.lineCap = 'round';
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.setState({canvas: canvas, context: context});
    console.log('initcanvas');
    return context;
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

  onDraw(data) {
    const canvas = this.state.canvas;
    const context = this.state.context;
    if(data.type === 'path') {
      this.drawPath(canvas, context, data.color, data.thickness, data.event, data.coords.x, data.coords.y);
    }
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

  broadcastPath(event, coords){
    this.$socket.emit(
      'draw', 
      { 
        type: 'path', 
        event: event, 
        coords: coords, 
        color: this.state.selectedColor,
        thickness: this.state.selectedThickness
      }
    );
  }

  onHostLeft() {
  }
  
  penDown(canvas, context, x, y) {
    if(this.state.isAllowed){
      this.setState({isPenDown: true, localPen: {x: x, y: y} });
      this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'start', x, y);
      this.broadcastPath('start',{x: x, y: y});
    }
    
  }

  penMove(canvas, context, x, y) {
    if(this.state.isPenDown && this.state.isAllowed) {
      this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'move', x, y);
      this.broadcastPath('move', { x: x, y: y});
    }
  
  }

  penUp(canvas, context, x, y) {
    if(this.state.isPenDown && this.state.isAllowed) {
      this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'end', x, y);
      this.broadcastPath('end', {x: x , y: y});
    }
    this.setState({isPenDown: false});

  }

  drawPath(canvas, context, color, thickness, type, x, y) {
    context.strokeStyle = color;
    context.lineWidth = thickness;

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
    context.restore();
    this.setState({ context: context });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        {this.state.canvas}
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
