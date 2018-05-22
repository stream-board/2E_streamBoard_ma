import React, { Component } from "react";
import { TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ColorPicker } from 'react-native-color-picker';
import { Col, Row, Grid } from "react-native-easy-grid";
import { PARTICIPANTS_BY_ID, PARTICIPANT_JOINED } from './../TypesDef';
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


export default class RoomsParticipants extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.subscribeToJoinedParticipants();
  }
  render() {
    return (
      <Content>
        {this.props.data.participantsById.map((participant, index) => (
        <Card key={this.props.index} style={styles.cardContainer}>
          <CardItem button style={styles.cardItem} onPress={() => {
              console.log('press participant');
            }
          } >
          <Left>
             <Thumbnail source={{uri: participant.image }} />
            <Body>
              <Text style={styles.subtitle}>{participant.name}</Text>
              <Text style={styles.description}>
              {participant.nickname}
              </Text>
            </Body>
          </Left>
          </CardItem>
        </Card>
        ))}
      </Content>
    )
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
