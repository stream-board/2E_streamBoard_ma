import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Spinner, Button, Body, Left, Right, Tabs, Tab, Text, Title, Subtitle, Input, Form, Item, Label, Icon } from 'native-base';

import RoomsList from '../../rooms/components/RoomsList.js';

/*DEPRECATED*/
export default class JoinRoomPage extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      roomId: 27
    };
  }
  render() {
    return (
      <Container style={styles.container}>

        <Tabs locked={true} tabBarPosition={"overlayTop"} >
          <Tab heading="Buscar" tabBarPosition={"overlayTop"}>
          <Form>
            <Item floatingLabel >
                <Label>Id Room</Label>
                <Input onChangeText= {(text)=> this.setState({roomId:text})}
                  />
            </Item>
          </Form>
          <Button onPress={() =>  this.props.navigation.navigate('RoomsDetail' , { roomId: this.state.roomId })}>
            <Text>Buscar</Text>
          </Button>
          </Tab>
          <Tab heading="Rooms">
            <RoomsList />
          </Tab>
        </Tabs>
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
