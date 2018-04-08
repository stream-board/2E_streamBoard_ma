import React, { Component }from 'react';
import { Text, View, StyleSheet } from 'react-native';

var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia,
} = WebRTC;

export default class Streaming extends Component {
  render() {
    const { roomId } = this.props;

    return (
      <View style={styles.chatContainer}>
        <Text>Hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#287b97'
  }
})
