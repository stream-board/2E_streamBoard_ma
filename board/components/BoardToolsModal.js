import React, { Component } from "react";
import { Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ColorPicker } from 'react-native-color-picker';
import { Fab, Icon, Button, View } from 'native-base';

export default class ModalTester extends Component {
  constructor(props){
      super(props);
      this.state = {
        isModalVisible: false,
        active: 'false'
      };
      this._toggleModal = this._toggleModal.bind(this);
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View>
        <Fab 
            active={this.state.active}
            direction='up'
            containerStyle={{marginBottom: 10}}
            style={styles.settingBtn}
            potition='bottomRight'
            onPress={()=>{ 
                this.setState({ 'active': !this.state.active });
            }}
        >
            <Icon type='FontAwesome' name='cogs'/>
            <Button style={styles.toolBtn} onPress={this._toggleModal}>
                <Icon type='MaterialIcons' name='color-lens' style={{ color: '#26d3cd' }}/>
            </Button>
            <Button style={styles.toolBtn} onPress={()=> { this.setState({ onChageColor: true}); console.log('brush')}}>
                <Icon type='MaterialIcons' name='brush' style={{ color: '#26d3cd' }}/>
            </Button>
        </Fab>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <ColorPicker
                oldColor='purple'
                onColorSelected={color => {
                    this.props.changeColor(color);
                    this._toggleModal();
                }}
                style={{flex: 1}}
                />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    colorWheel: {
        width: Dimensions.get('window').width
    },
    thumbStyle: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    settingBtn: {
        backgroundColor: '#174557',
    }
});