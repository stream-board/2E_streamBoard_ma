import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
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
  Subtitle,
  Text
} from 'native-base';

import { Query } from 'react-apollo';
import { ALL_ROOMS_QUERY } from './../TypesDef';


export default () => (
  <Query query={ALL_ROOMS_QUERY}>
    {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <Text>{`Error: ${error}`}</Text>;
        return (
          <Container style={styles.listElement}>
            {data.allRooms.map(({ idRoom, nameRoom, owner }, index) => (
            <Card key={index}>
              <CardItem header button onPress={() => this.props.navigation.navigate('RoomsDetail' , { roomId: {idRoom} })}>
                <Text>NameRoom: {nameRoom}</Text>
              </CardItem>
              <CardItem>
              <Text>idRoom : {idRoom}</Text>
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
  listElement:{
    margin:10,
  }
})
