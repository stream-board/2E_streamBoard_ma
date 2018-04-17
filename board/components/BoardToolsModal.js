import React, { Component } from "react";
import { Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ColorPicker } from 'react-native-color-picker';
import { Fab, Icon, Button, View } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ModalTester extends Component {
  constructor(props){
      super(props);
      this.state = {
        isModalVisible: false,
        active: 'false',
        type: this.props.activeType
      };
      this._toggleModal = this._toggleModal.bind(this);
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    let iconType = (this.state.type === 'eraser') ? 'pencil': 'eraser';

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
                <Icon type='MaterialIcons' name='color-lens' style={{ color: '#FFF' }}/>
            </Button>
            <Button style={styles.toolBtn} onPress={()=> { this.setState({ onChageColor: true}); console.log('brush')}}>
                <Icon type='MaterialIcons' name='brush' style={{ color: '#FFF' }}/>
            </Button>
            <Button style={styles.toolBtn} onPress={() => this.props.clearBoard()}>
                <Icon type='FontAwesome' name='trash' style={{ color: '#FFF' }}/>
            </Button>
            <Button style={styles.toolBtn} onPress={() =>{
                let newType = (this.state.type === 'eraser') ? 'point': 'eraser';
                this.props.setType(newType);
                this.setState({ type: newType });
            }}>
                <Icon type='FontAwesome' name={iconType} style={{ color: '#FFF' }}/>
            </Button>
        </Fab>
        <Modal isVisible={this.state.isModalVisible}>
          <Grid>
            <Row size={4}>
            <ColorPicker
                oldColor='purple'
                onColorSelected={color => {
                    this.props.changeColor(color);
                    this._toggleModal();
                }}
                style={{flex: 1}}
                />
            </Row>
            <Row size={1} style={{justifyContent: 'center', marginTop: 20}}>
                <Col>
                    <Button style={styles.shapeBtn} onPress={() => console.log("boton1")}>
                        <Icon type='FontAwesome' name='circle' style={{ color: '#FFF', fontSize: 8 }}/>
                    </Button>
                </Col>
                <Col>
                    <Button style={styles.shapeBtn} onPress={() => console.log("boton2")}>
                        <Icon type='FontAwesome' name='circle' style={{ color: '#FFF', fontSize: 12 }}/>
                    </Button>
                </Col>
                <Col>
                    <Button style={styles.shapeBtn} onPress={() => console.log("boton3")}>
                        <Icon type='FontAwesome' name='circle' style={{ color: '#FFF', fontSize: 18 }}/>
                    </Button>
                </Col>
                <Col>
                    <Button style={styles.shapeBtn} onPress={() => console.log("boton4")}>
                        <Icon type='FontAwesome' name='circle' style={{ color: '#FFF', fontSize: 24 }}/>
                    </Button>
                </Col>
                <Col>
                    <Button style={styles.shapeBtn} onPress={() => console.log("boton5")}>
                        <Icon type='FontAwesome' name='circle' style={{ color: '#FFF', fontSize: 36 }}/>
                    </Button>
                </Col>
            </Row>
          </Grid>
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
    },
    toolBtn: {
        backgroundColor: '#26d3cd',
    },
    shapeBtn:{
        backgroundColor: '#0a8b88',
        borderRadius: 10,
    }
});