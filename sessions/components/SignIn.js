import React, { Component } from 'react';
import { SessionCreateMutation } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';
import { sessionActionCreators } from "./../sessionsRedux";
import { AppRegistry, StyleSheet, View , Image, Platform, } from 'react-native';
import {
  Spinner,
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Button,
  Title,
  Subtitle,
  Label,
  Left,
  Body,
  Right,
  Text,
} from 'native-base';
import { Constants } from 'expo';


export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onForm = this.onForm.bind(this);
    this.onCreateSession = this.onCreateSession.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    header: null,
    formSended: false,
  })

  onForm(createSession) {

    return (
      <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}> 
      <Header style={{ height: 50}}>
          <Left />
          <Body>
            <Title>Title</Title>
            <Subtitle>Subtitle</Subtitle>
          </Body>
          <Right />
        </Header>
        <Image 
          style = { styles.image }
          source = { require('./logo.png' ) }
        />

        <Item floatingLabel style={styles.formElement}>
          <Label>Email</Label>
          <Input
          onChangeText= {(text)=>{
            Store.dispatch( sessionActionCreators.addUserEmail(text));
          }}
          />
        </Item>

        <Item floatingLabel style={styles.formElement}>
        <Label>Password</Label>
        <Input
          secureTextEntry={true}
          onChangeText= {(text)=>{
            Store.dispatch( sessionActionCreators.addUserPassword(text));
          }}
        />
        </Item>

        <Button style={styles.buttonStyle} rounded success
          onPress={() => {
            createSession({ 
              variables: { 
                session: Store.getState().sessionCreateParams 
              }
            })
            this.setState({formSended: true});
          }}
        >
          <Text>Sign In</Text>
        </Button>
      </Container>
    )
  };

  onCreateSession(data){
    Store.dispatch(sessionActionCreators.addCurrentUser(data.createSession));
    return (
      <Spinner />
    )
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.formSended) {
      this.props.navigation.navigate('Lobby');
    }
  }

  render(){
    return (
      <Mutation 
        mutation={SessionCreateMutation} 
      >
        {(createSession, { loading, error, data }) => (
          <View>
          {(data ? this.onCreateSession(data) : this.onForm(createSession))}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }
}


const styles = StyleSheet.create({
  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  formElement: {
    height: 70,
    width: 350,
    alignSelf: 'center',
    marginTop: 30,
  },

  buttonStyle:{
    marginTop: 20,
    alignSelf: 'center',
  },

  image: {
    height: 180,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,

  }
});