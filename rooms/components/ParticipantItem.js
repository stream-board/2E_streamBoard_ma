import React, { Component } from "react";
import { TouchableOpacity, Dimensions, StyleSheet, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { BAN_PARTICIPANT_MUTATION } from './../TypesDef';
import { Mutation } from 'react-apollo';
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
import { asyncWrapFunction } from './../../utils';

export default class ParticipantItem extends Component {
  constructor(props) {
    super(props);

    this.participant = this.participant.bind(this);
    this.banned = this.banned.bind(this);
  }
  participant (banParticipant) {
    return (
      <Card key={this.props.index} style={styles.cardContainer}>
        <CardItem button style={styles.cardItem} onPress={() => {
            console.log('press participant');
          }
        } >
          <Body>
          <Grid>
            <Col size={1}>
              <Thumbnail source={{uri: this.props.participant.image }} />
            </Col>
            <Col size={3}>
              <Text style={styles.subtitle}>{this.props.participant.name}</Text>
              <Text style={styles.description}>{this.props.participant.nickname}</Text>
            </Col>
            <Col size={1}>
              <Button style={styles.buttonStyle}
              onPress={() => {
                let banParam = {
                  bannedParticipant: {
                    idRoom : this.props.roomId,
                    idParticipant : this.props.participant.id
                  }
                }
                console.log(banParam);
                asyncWrapFunction(banParticipant, banParam).then(() => {
                  this.setState({exitRoom: true});
                  console.log('participant banned');
                })
              }}
            ><Text style={{ color: '#fff' }}>Bannear</Text>
            </Button>
          </Col>
          </Grid>
          </Body>
          
        </CardItem>
      </Card>
    )
  }

  banned(data) {
    return (
      <Card key={this.props.index} style={styles.cardContainer}>
        <CardItem button style={styles.cardItem} onPress={() => {
            console.log('press participant');
          }
        } >
          <Left>
              <Thumbnail source={{uri: this.props.participant.image }} />
            <Body>
              <Text style={styles.subtitle}>{this.props.participant.name}</Text>
              <Text style={styles.description}>
              {this.props.participant.nickname}
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
  }

  render() {
    return (
      <Mutation mutation={BAN_PARTICIPANT_MUTATION}>
        {(banParticipant, {loading, error, data})=> ( 
          <View>
          {loading  && <Spinner />}
          {(data ? this.banned(data) : this.participant(banParticipant))}
          {error && <Text> {`Error!!! ${error}`} </Text>}
          </View>
        )}
      </Mutation>
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
  },
  buttonStyle:{
    backgroundColor: '#f44336',
    borderRadius: 8,
    justifyContent: 'center'
  }
})
