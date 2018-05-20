import React, { Component } from 'react';
import { SessionCreateMutation } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import { connect } from 'react-redux';
import { sessionActionCreators } from "./../sessionsRedux";
import { AppRegistry, StyleSheet, View , Image, Platform, Alert, BackHandler, } from 'react-native';
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
import { Col, Row, Grid } from "react-native-easy-grid";
import { asyncWrapFunction } from './../../utils';
import { onError } from "apollo-link-error";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSended: false,
      hasError: false
    }
    this.onForm = this.onForm.bind(this);
    this.onCreateSession = this.onCreateSession.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  onForm(createSession) {

    return (
      <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}> 
      <Grid style={{justifyContent: 'center',}}>
        <Col size={1}></Col>
        <Col size={20}>
          {/*LOGO*/}
          <Row size={4}>
            <Image 
              style = { styles.img }
              source = { require('./logo-white.png' ) }
            />
          </Row>
          {/*EMAIL*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={6}>

              <Item floatingLabel>
                <Label style={{color:'white'}}>Email</Label>
                <Input style={{color:'white'}}
                onChangeText= {(text)=>{
                  Store.dispatch( sessionActionCreators.addUserEmail(text));
                }}
                />
              </Item>

            </Col>
            <Col size={1}></Col>
          </Row>
          {/*PASSWORD*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={6}>

              <Item floatingLabel>
              <Label style={{color:'white'}}>Password</Label>
              <Input style={{color:'white'}}
                secureTextEntry={true}
                onChangeText= {(text)=>{
                  Store.dispatch( sessionActionCreators.addUserPassword(text));
                }}
              />
              </Item>

            </Col>
            <Col size={1}></Col>
          </Row>
          {/*BUTTON*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={4}>
              <Button 
                block
                style={styles.buttonStyle}
                onPress={() => {
                  let sessionParam = {
                    session: Store.getState().sessionCreateParams
                  };
                  asyncWrapFunction(createSession, sessionParam).then(() => {
                    this.setState({formSended: true});
                  }
                 ).catch(() => {
                    console.log("hay error!! usuario invalido");
                    Alert.alert(
                      'Sorry :(',
                      'Ups! Email or password incorrect',
                      [
                        {
                          text: 'OK', onPress: () => console.log('ok')
                        }
                      ],
                      { cancelable: false }
                    );
                  
                  });
                }}
              >
                <Text>Sign In</Text>
              </Button>

            </Col>
            <Col size={1}></Col>
          </Row>
          {/*BANNER*/}
          <Row size={2}>
            
            <Image style={styles.img}
                source = { require('./banner.png' ) }
            />

          </Row>
        </Col>
        <Col size={1}></Col>
      </Grid>

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

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    console.log("oprime back");
    Alert.alert(
      'Exit',
      'Are you sure?',
      [
        {text: 'Nope', onPress: () => console.log('No me vy a salir')},
        {text: 'OK', onPress: () => 
          {
            console.log('OK Pressed');
            BackHandler.exitApp();
          }
        },
      ],
      { cancelable: false }
    );
    return true;
  }

  render(){
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (
      <Mutation 
        mutation={SessionCreateMutation} 
      >
        {(createSession, { loading, error, data }) => (
          <View style={styles.container}>
          {(data ? this.onCreateSession(data) : this.onForm(createSession))}
          </View>
        )}
      </Mutation>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#174557',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },

  buttonStyle:{
    backgroundColor: '#26d3cd',
    borderRadius: 8,
  },

  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    padding: 3,
  },

});