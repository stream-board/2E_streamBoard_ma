
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { SessionDeleteMutation } from './../TypesDef'
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

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, text: '' };
    this.onForm = this.onForm.bind(this);
    this.onDeleteSession = this.onDeleteSession.bind(this);
  }

  onForm(deleteSession) {
    return (
      <Container>
        <Title style={styles.titleElement}>HLA</Title>

        <Button style={styles.buttonStyle} rounded success
          onPress={() => {
            deleteSession({ 
              variables: { 
                headersSession: {
                  token : Store.getState().currentUser.token,
                  uid : Store.getState().currentUser.email,
                  client : Store.getState().currentUser.client
                }
              }
            })
          }}
        ><Text>Salir</Text></Button>
      </Container>
    )
  };

  onDeleteSession(data){
    console.log(data);
    console.log(this.props.navigation);
    Store.dispatch(sessionActionCreators.deleteCurrentUser());
    return this.props.navigation.navigate('SignIn')
  };

  render(){
    return (
      <Mutation 
        mutation={SessionDeleteMutation} 
      >
        {(deleteSession, { loading, error, data }) => (
          <View>
          {(data ? this.onDeleteSession(data) : this.onForm(deleteSession))}
          {loading && <Spinner />}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }
}


const styles = StyleSheet.create({
  container: {
  },

  titleElement: {
    margin: 20,
    backgroundColor: 'skyblue',
    alignSelf: 'center',

  },

  formElement: {
    height: 70,
  },

  buttonStyle:{
  }
});