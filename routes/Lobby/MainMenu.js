import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Spinner, Button, Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon } from 'native-base';

export default class MainMenuPage extends Component {
  render() {
    return (
      <Container style={styles.container}>
          <Title style={ styles.titleElement }>Bienvenido de nuevo $USER</Title>
          <Button rounded primary style={ styles.buttonStyle } onPress={() => this.props.navigation.navigate('CreateRoom')}>
            <Text>Crear sala</Text>
          </Button>
          <Button rounded primary style={ styles.buttonStyle } onPress={() => this.props.navigation.navigate('JoinRoom')}>
            <Text>Unirse a sala</Text>
          </Button>
          <Button rounded primary style={ styles.buttonStyle } onPress={() => this.props.navigation.goBack() }>
            <Text>Cerrar Sesion</Text>
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
