import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, Header, Body, Title, Input, Spinner} from "native-base";

import RoomsList from '../../rooms/components/RoomsList';


export default class JoinRoom extends Component {

  render() {
    return (
      <Container>
      <Header>
        <Text>Join Room</Text>
      </Header>
      <Content>
      	<Tabs locked={true} tabBarPosition={"overlayTop"}>
	        <Tab heading="Buscar" tabBarPosition={"overlayTop"}>
	          <Text>Digite Id de la Sala</Text>
	        </Tab>
	        <Tab heading="Rooms">
	          <Spinner />
	        </Tab>
	      </Tabs>
      </Content>
      </Container>
    );
  }
}