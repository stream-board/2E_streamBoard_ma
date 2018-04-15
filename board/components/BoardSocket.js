import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  PanResponder,
  Platform,
  Dimensions
} from 'react-native';

import SocketIOClient from 'socket.io-client';

import {
  serverIp,
  port,
  entryPoint
} from './../Server';

import Canvas, {Image as CanvasImage, Path2D} from 'react-native-canvas';
import { Fab, Icon, Button, View } from 'native-base';


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
    this.$socket.on('connect', () => {
      console.log('Connected');
      console.log(this.socket);
    });

    this.state = {
      isAllowed: true,
      isPenDown: false,
      contextDidSet: false,
      selectedColor: defaultLineColor,
      selectedThickness: defaultLineThickness,
      canvas: <Canvas style={{ backgroundColor: '#fff', width: '100%', height: '100%', position: 'absolute', top:0, left: 0 }} ref={this.initCanvas} />,
      context: '',
      hasTouch: false,
      localPen: {},
      active: 'false',
      onChangeColor: false
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
        let touchX = gestureState.x0 - 20;
        let touchY = gestureState.y0 - 130;
        if(!this.state.isPenDown) {
          this.penDown(canvas, context, touchX, touchY);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX - 20;
        let touchY = gestureState.moveY - 130;
        this.penMove(canvas, context, touchX, touchY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const canvas = this.state.canvas;
        const context = this.state.context;
        let touchX = gestureState.moveX - 40;
        let touchY = gestureState.moveY - 130;
        this.penUp(canvas, context, touchX, touchY);
      },
    });
  }
  componentDidMount() {
    console.log('did Mount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.onChageColor){
      return true;
    }
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
    console.log(data);
    const canvas = this.state.canvas;
    const context = this.state.context;
    if(data.type === 'path') {
      this.drawPath(canvas, context, data.color, data.thickness, data.event, data.coords.x, data.coords.y);
    }
  }
  
  onAnswerForBoard(data) {
    if(data) {
      this.setState({isAllowed: true});
    } else {
      this.setState({isAllowed: false});
    }
  }

  resetPermissions() {
    this.$socket.emit('resetBoard');
  }

  askForTurn() {
    this.$socket.emit('askForBoard');
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
      <View style={styles.container}>
        <View style={styles.canvas} {...this._panResponder.panHandlers}>
          {this.state.canvas}
        </View>
        <Fab 
          active={this.state.active}
          direction='up'
          containerStyle={{paddingBottom: 10}}
          style={styles.settingBtn}
          potition='bottomRight'
          onPress={()=>{ this.setState({ 'active': !this.state.active })}}
        >
          <Icon type='FontAwesome' name='home' />
          <Button style={styles.toolBtn}>
            <Icon type='MaterialIcons' name='color-lens' style={{ color: '#26d3cd' }}/>
          </Button>
          <Button style={styles.toolBtn} onPress={()=> { this.setState({ onChageColor: true}); console.log('brush')}}>
            <Icon type='MaterialIcons' name='brush' style={{ color: '#26d3cd' }}/>
          </Button>
        </Fab>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    overflow: 'hidden',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 210
  },

  canvas: {
    flex: 1
  },

  settingBtn: {
    backgroundColor: '#174557',
  },

  toolBtn: {
    backgroundColor: '#174557'
  }
})
