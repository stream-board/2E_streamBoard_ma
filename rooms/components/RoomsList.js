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
  List,
  ListItem,
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
          <List>
            {data.allRooms.map(({ idRoom, nameRoom, owner }, index) => (
              <ListItem 
                key={index} style={styles.roomContainer}
                title={ {nameRoom} }
                subtitle=  {owner.name}
              >
                <Text>IdRoom: {idRoom}</Text>
              </ListItem>
            ))}
          </List>
          </Container>
        )
      }
    }
  </Query>
);

const styles = StyleSheet.create({
  roomContainer: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    backgroundColor: '#0DEBFF'
  },
})
