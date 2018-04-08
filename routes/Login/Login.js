import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, Input, Header, Body, Title} from "native-base";
import MainMenu from "../MainMenu/MainMenu.js"

export default class Login extends Component {
  render() {
    return (
      <Container>
      <Header>
        <Body>
          <Title>Stream Board</Title>
        </Body>
      </Header>
        <Content>
          <Text>INICIAR SESION</Text>
          <Input />
          <Button primary onPress={() => this.props.navigation.navigate(MainMenu)}>
            <Text>INGRESAR</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}