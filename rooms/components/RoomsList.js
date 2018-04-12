import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';

import {
  Spinner,
  Container,
  Header,
  Content,
  Form,
  Card,
  CardItem,
  Title,
  Subtitle
} from 'native-base';

import { Query } from 'react-apollo';
import { ALL_ROOMS_QUERY } from './../TypesDef';


export default () => (
  <Query query={ALL_ROOMS_QUERY}>
    {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Text>{`Error: ${error}`}</Text>;
        return (
          <Container>
            {data.allRooms.map(({ idRoom, nameRoom, owner }, index) => (
            <Card key={index}>
              <CardItem header bordere onPress={() => this.props.navigation.navigate('RoomsDetail' , { roomId: {idRoom} })}>
                <Text>IdRoom: {nameRoom}</Text>
              </CardItem>
              <CardItem bordered>
                <Text>IdRoom: {owner.nickname}</Text>
              </CardItem>
            </Card>
            ))}
          </Container>
        )
      }
    }
  </Query>
);

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    height: 50,
    backgroundColor: '#0DEBFF'
  },
})
