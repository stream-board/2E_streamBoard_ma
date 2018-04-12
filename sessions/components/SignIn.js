import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View , Image } from 'react-native';
import { SessionCreateMutation } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import {
  Spinner,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Title,
  Label
} from 'native-base';
import { connect } from 'react-redux';
import { sessionActionCreators } from "./../sessionsRedux";

const mapStateToProps = (state) => ({
  queryParams: state.queryParams,
})

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onForm = this.onForm.bind(this);
    this.onCreateSession = this.onCreateSession.bind(this);
  }

  onForm(createSession) {
    return (
      <Container style = { styles.container } >
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
          }}
        >
          <Text style={{alignSelf:'center'}}>Sign In</Text>
        </Button>
      </Container>
    )
  };

  onCreateSession(data){
    console.log(data);
    console.log(this.props.navigation);
    if(data) {
      Store.dispatch(sessionActionCreators.addCurrentUser(data.createSession));
    }
    return this.props.navigation.navigate('Lobby');
  };

  render(){
    return (
      <Mutation 
        mutation={SessionCreateMutation} 
      >
        {(createSession, { loading, error, data }) => (
          <View>
          {(data ? this.onCreateSession(data) : this.onForm(createSession))}  
          {loading && <Spinner />}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }
}

export default connect(mapStateToProps)(SignIn)

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
    width: 100,
  },

  image: {
    height: 180,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,

  }
});