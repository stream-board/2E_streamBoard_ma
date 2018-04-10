import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Spinner, Button, Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon } from 'native-base';

export default class Login extends Component {
  render() {
    return (
      <Container style={styles.container} >
          <Text style={styles.titleElement}>INICIAR SESION</Text>
          <Item floatingLabel style={styles.formElement}>
            <Label>Email</Label>
            <Input
            onChangeText= {(text)=>{
              Store.dispatch( { type:'addRoomName', payload: text })
            }}
            />
          </Item>
          
          <Item floatingLabel style={styles.formElement}>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText= {(text)=>{
                Store.dispatch( { type:'addRoomDescription', payload: text })
              }}
            />
          </Item>
        
          <Button style={styles.buttonStyle} rounded success onPress={() => this.props.navigation.navigate('MainMenu')}>
            <Text>INGRESAR</Text>
          </Button>

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2FFD2',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },

  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  formElement: {
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    width: 300,
    margin: 20,

  },

  buttonStyle:{
    marginTop: 30,
    backgroundColor: 'blue',
    alignSelf: 'center',

  }
});
