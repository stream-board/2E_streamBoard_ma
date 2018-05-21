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
import { asyncWrapFunction } from './../../utils';

export default class RoomsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            joinRoomFunc: this.props.joinRoom,
            room: this.props.room,
            joinedToRoom: false
        }    
    }

    render() {
        return (
        <Card key={this.props.index} style={styles.cardContainer}>
        <CardItem button style={styles.cardItem} onPress={() => {
            console.log(this.props.room);
            /*let roomParam = {
              room:  {
                idRoom: this.state.room.idRoom,
                idOwner: Store.getState().currentUser.id
              }
            }
            asyncWrapFunction(this.props.joinRoom, roomParam).then(()=> {
              this.setState({ joinedToRoom: true });  
            })*/
            this.props.joinRoom({
              variables: {room: {
                idRoom: this.state.room.idRoom,
                idOwner: Store.getState().currentUser.id
              }}
            })
            this.setState({ joinedToRoom: true , roomSelected: this.state.room.idRoom }); 
          }
        } >
        <Left>
          {this.state.room.owner ? <Thumbnail source={{uri: this.state.room.owner.image }} />: <Text></Text>}
          <Body>
            <Text style={styles.subtitle}>{this.state.room.nameRoom}</Text>
            <Text style={styles.description}>
            {this.state.room.owner ? this.state.room.owner.name : 'Not available' }
            </Text>
            <Text style={styles.description}>{this.state.room.descriptionRoom}</Text>
          </Body>
        </Left>
        </CardItem>
      </Card>
        )
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.state.joinedToRoom) {
        this.props.navigation.navigate('RoomsDetail', { roomId: this.state.roomSelected})
      }
    }
}



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
  