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
    this.state = {
      formSended: false
    }
    this.onForm = this.onForm.bind(this);
    this.onCreateSession = this.onCreateSession.bind(this);
  }

  onForm(createSession) {

    return (
      <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}> 

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
          //secureTextEntry={true}
          onChangeText= {(text)=>{
            Store.dispatch( sessionActionCreators.addUserPassword(text));
          }}
        />
        </Item>

        <Button style={styles.buttonStyle} rounded success
          onPress={() => {
           async function auth(){ 
             await createSession({ 
              variables: { 
                session: Store.getState().sessionCreateParams 
              }
            })
           }
           auth().then(() => {
              this.setState({formSended: true});
            }
           );
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