import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Header } from 'react-native';
import { Container,
         Content,
         Spinner,
         Button,
         Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon, Fab } from 'native-base';

import RoomsList from '../../rooms/components/RoomsList.js';

export default class LobbyPage extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      //variable to FAB
      active: 'true',
    }
  }
  render() {
    return (
      <Container style={styles.container}>
          <Text>Unete con el ID</Text>
          <Form>
            <Item floatingLabel >
                <Label>Id Room</Label>
                <Input onChangeText= {(text)=> this.setState({roomId:text})}
                  />
            </Item>
          </Form>
          <Button onPress={() => {
              console.log(this.state.roomId);
              this.props.navigation.navigate('RoomsDetail' , { roomId: this.state.roomId })}
            }>
            <Text>Buscar</Text>
          </Button>
        {/*LIST OF ROOMS*/}
        <Content>
          <RoomsList />
        </Content>
          <Fab
            active = {this.state.active}
            style={styles.fabElement}
            position='bottomRight'
            onPress={() => this.props.navigation.navigate('CreateRoom')}
          >
          <Icon name="add" />
          </Fab>
        {/*LOG OUT*/}  

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

  },

  fabElement: {
    backgroundColor: '#5067FF',

  },
});