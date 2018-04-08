import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, Input, Header, Body, Title} from "native-base";


export default class MainMenu extends Component {

  render() {
    return (
      <Container>
      <Header>
        <Body>
          <Title>Stream Board</Title>
        </Body>
      </Header>
        <Content>
          <Button primary onPress={() => this.props.navigation.navigate("CreateRoom")}>
            <Text>Crear sala</Text>
          </Button>
          <Button primary onPress={() => this.props.navigation.navigate("JoinRoom")}>
            <Text>Unirse a sala</Text>
          </Button>
          <Button primary onPress={() => this.props.navigation.goBack() }>
            <Text>Cerrar Sesion</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}