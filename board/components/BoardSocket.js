import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  PanResponder,
  Platform,
  Dimensions,
  Alert
} from 'react-native';

import SocketIOClient from 'socket.io-client';

import {
  serverIp,
  port,
  entryPoint
} from './../Server';

import Canvas, {Image as CanvasImage, Path2D} from 'react-native-canvas';
import { Fab, Icon, Button, View } from 'native-base';

import ToolsModal from './BoardToolsModal';


export default class BoardSocket extends Component {
  constructor(props) {
    super(props);

    const defaultLineColor = '#000000';
    const defaultLineThickness = 3;

    const { roomId, userNick, userId, roomOwner } = this.props;
    console.log(roomOwner);
    const admin = (userId === roomOwner) ? true: false;
    const url = `http://${serverIp}?room=${roomId}&nick=${userNick}&id=${userId}`;
    this.$socket = SocketIOClient(url);
    this.broadcastPath = this.broadcastPath.bind(this);
    this.broadcastErase = this.broadcastErase.bind(this);
    this.resetPermissions = this.resetPermissions.bind(this);
    this.onResetBoard = this.onResetBoard.bind(this);
    this.onLostPermission = this.onLostPermission.bind(this);
    this.onSetAdmin = this.onSetAdmin.bind(this);
    this.askForTurn = this.askForTurn.bind(this);
    this.onAskForBoard = this.onAskForBoard.bind(this);
    this.onAnswerForBoard = this.onAnswerForBoard.bind(this);
    this.onHostLeft = this.onHostLeft.bind(this);
    this.onDraw = this.onDraw.bind(this);
 
    this.penDown = this.penDown.bind(this);
    this.penMove = this.penMove.bind(this);
    this.penUp = this.penUp.bind(this);

    this.drawPath = this.drawPath.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeThickness = this.changeThickness.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.setType = this.setType.bind(this);
    this.onClose = this.onClose.bind(this);

    this.$socket.on('connect', () => {
      console.log('Connected to board socket');
    });

    this.state = {
      isAllowed: admin,
      isPenDown: false,
      contextDidSet: false,
      selectedColor: defaultLineColor,
      selectedThickness: defaultLineThickness,
      canvas: <Canvas style={{ backgroundColor: '#fff', width: '100%', height: '100%', position: 'absolute', top:0, left: 0 }} ref={this.initCanvas} />,
      context: '',
      hasTouch: false,
      localPen: {},
      active: 'false',
      onChangeColor: false,
      type: 'point',
      admin: admin,
    }
    this.$socket.on('resetBoard', this.onResetBoard);
    this.$socket.on('lostPermission', this.onLostPermission);
    this.$socket.on('admin', this.onSetAdmin);
    this.$socket.on('askForBoard', this.onAskForBoard);
    this.$socket.on('answerForBoard', this.onAnswerForBoard);
    this.$socket.on('hostLeft', this.onHostLeft);
    this.$socket.on('draw', this.onDraw);
    this.$socket.on('clear', this.clearBoard);
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
        let touchX = gestureState.x0;
        let touchY = gestureState.y0 - 100;
        if(!this.state.isPenDown) {
          this.penDown(canvas, context, touchX, touchY);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX;
        let touchY = gestureState.moveY - 100;
        this.penMove(canvas, context, touchX, touchY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX;
        let touchY = gestureState.moveY - 100;
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
    let context = canvas.getContext('2d');
    canvas.height = 720;
    canvas.width = 1280;
    context.lineCap = 'round';
    context.fillStyle = "#fff";
    this.setState({canvas: canvas, context: context, contextDidSet: true});
    console.log('initcanvas');  
    return context;
  }

  changeColor(selectedColor) {
    this.setState({ selectedColor: selectedColor });
  }

  changeThickness(selectedThickness){
    this.setState({ selectedThickness: selectedThickness});
  }

  setType(type) {
    this.setState({ type: type });
  }

  onLostPermission(data) {
    console.log('se ha reseteado');
    //Modals
    alert(
      'You lost permission',
      'You can no longer draw',
      {text: 'OK', onPress: () => console.log('ok')}
    )
    this.setState({ isAllowed: false });
  }

  onResetBoard(data) {
    console.log('Rset board');
    //Modals
    alert(
      'You took the pen back',
      'You can start drawing again',
      {text: 'OK', onPress: () => console.log('ok')}
    )
    this.setState({ isAllowed: true });
  }

  onSetAdmin(data) {
    //hide actions
    this.setState({isAllowed: true});
  }

  onAskForBoard(data) {
    //modal
    Alert.alert(
      'Turn petition',
      `User ${data.nick} wants to use the board`,
      [
        { 
          text: 'Yes, approve',
          onPress: () => { 
            console.log('yes');
            this.$socket.emit('answerForBoard', {answer: true, socketId: data.socketId });
            this.setState({isAllowed: false});
          }
        },
        {
          text: 'No, disapprove',
          onPress: () => { 
            console.log('no');
            this.$socket.emit('answerForBoard', {answer: false, socketId: data.socketId });
          },
          style: 'cancel'
        }
      ]
    )
  }

  onClose() {
    this.$socket.disconnect();
  }

  onDraw(data) {
    console.log(data);
    const canvas = this.state.canvas;
    const context = this.state.context;
    if(data.type === 'path') {
      this.drawPath(canvas, context, data.color, data.thickness, data.event, data.coords.x, data.coords.y);
    }
  }
  
  onAnswerForBoard(data) {
    if(data) {
      alert(
        'Permission granted',
        'You can draw on the board',
        [
          {
            text: 'OK', onPress: () => console.log('ok')
          }
        ]
      );
      this.setState({isAllowed: true});
    } else {
      alert(
        'Permission denied',
        'You can\'t draw on the board',
        [
          {
            text: 'OK', onPress: () => console.log('ok')
          }
        ]
      );
      this.setState({isAllowed: false});
    }
  }

  resetPermissions() {
    this.$socket.emit('resetBoard');
  }

  askForTurn() {
    console.log('aks gor');
    this.$socket.emit('askForBoard');
  }

  clearBoard(){
    console.log('clear');
    if(this.state.canvas) {
      console.log('clear');
      const canvas = this.state.canvas;
      const context = this.state.context;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();
      this.$socket.emit('clear');
    }
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

  broadcastErase(event, coords){
    this.$socket.emit(
      'draw', 
      { 
        type: 'path', 
        event: event, 
        coords: coords, 
        color: '#FFFFFF',
        thickness: this.state.selectedThickness
      }
    );
  }

  onHostLeft() {
  }
  
  penDown(canvas, context, x, y) {
    const type = this.state.type; 

    if(this.state.isAllowed){
      switch (type) {
        case 'point':
          this.setState({isPenDown: true, localPen: {x: x, y: y} });
          this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'start', x, y);
          this.broadcastPath('start',{x: x, y: y});    
          break;
        case 'eraser':
          this.setState({isPenDown: true, localPen: {x: x, y: y} });
          this.drawPath(canvas, context, '#FFFFFF', this.state.selectedThickness, 'start', x, y);
          this.broadcastErase('start',{x: x, y: y});    
          break;
      } 
      
    }
    
  }

  penMove(canvas, context, x, y) {
    const type = this.state.type;
    if(this.state.isPenDown && this.state.isAllowed) {
      switch (type) {
        case 'point':
          this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'move', x, y);
          this.broadcastPath('move', { x: x, y: y});    
          break;
        case 'eraser':
          this.drawPath(canvas, context, '#FFFFFF', this.state.selectedThickness, 'move', x, y);
          this.broadcastErase('move', { x: x, y: y});      
          break;
      }
    }
  }

  penUp(canvas, context, x, y) {
    const type = this.state.type;

    if(this.state.isPenDown && this.state.isAllowed) {
      switch (type) {
        case 'point':
          this.drawPath(canvas, context, this.state.selectedColor, this.state.selectedThickness, 'end', x, y);
          this.broadcastPath('end', {x: x , y: y});    
          break;
        case 'eraser':
          this.drawPath(canvas, context, '#FFFFFF', this.state.selectedThickness, 'end', x, y);
          this.broadcastErase('end', {x: x , y: y});
          break;
      }
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
      <View style={styles.container}>
        <View style={styles.canvas} {...this._panResponder.panHandlers}>
          {this.state.canvas}
        </View>
        <ToolsModal 
          currentColor={this.state.selectedColor} 
          changeColor={this.changeColor} 
          clearBoard={this.clearBoard} 
          setType={this.setType} 
          activeType={this.state.type}
          askForTurn={this.askForTurn}
          admin={this.state.admin}
          resetPermissions={this.resetPermissions}
          changeThickness={this.changeThickness}
          roomClosed={this.props.roomClosed}
          onClose={this.onClose}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    overflow: 'hidden',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height - 100
  },

  canvas: {
    flex: 1,
    backgroundColor: 'blue'
  },

  settingBtn: {
    backgroundColor: '#174557',
  },

  toolBtn: {
    backgroundColor: '#174557'
  }
})
