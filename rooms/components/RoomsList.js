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
  Text,
  List,
  Left, 
  Body,
  Right,
  Thumbnail,
  Icon,
  Button
} from 'native-base';

import { Query } from 'react-apollo';
import { ALL_ROOMS_QUERY } from './../TypesDef';
import Store from "./../../reduxConfig";

export default class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      joinedToRoom: false,
      roomSelected: 0,
    }
  };

  render(){
    return(
      <Query query={ALL_ROOMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <Text>{`Error: ${error}`}</Text>;
          console.log(data);
          return (
            <Content style={styles.roomsContainer}>
              {data.allRooms.map(({ idRoom, nameRoom, descriptionRoom, owner }, index) => (
              <Card key={index} style={styles.cardContainer}>
                <CardItem button style={styles.cardItem} onPress={() => {
                    this.props.joinRoom({
                      variables: {
                        room: {
                          idRoom: idRoom,
                          idOwner: Store.getState().currentUser.id
                        }
                      }
                    })
                    this.setState({ joinedToRoom: true , roomSelected: idRoom });
                  }
                } >
                <Left>
                  {owner ? <Thumbnail source={{uri: owner.image }} />: <Text></Text>}
                  <Body>
                    <Text style={styles.subtitle}>{nameRoom}</Text>
                    <Text style={styles.description}>
                    {owner ? owner.name : 'Not available' }
                    </Text>
                    <Text style={styles.description}>{descriptionRoom}</Text>
                  </Body>
                </Left>
                </CardItem>
              </Card>
              ))}
            </Content>
          )
        }
      }
      </Query>
    )
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.joinedToRoom) {
      this.props.navigation.navigate('RoomsDetail', { roomId: this.state.roomSelected})
    }
  }


};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    backgroundColor: '#0DEBFF'
  },
  roomsContainer:{
    margin: 10
  },
  listElement:{
    margin:10,
  },
  cardItem: {
    alignContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#fafafa',
  },
  subtitle: {
    fontWeight: 'bold',
    lineHeight: 20
  },
  description: {
    fontSize: 12,
    color: '#aeaeae'
  },
  col1: {
    width: '25%'
  },
  col2: {
    width: '75%'
  }
})
