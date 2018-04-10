import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
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
  Input
} from 'native-base';
import { connect } from 'react-redux';
import { sessionActionCreators } from "./../sessionsRedux";

const mapStateToProps = (state) => ({
  queryParams: state.queryParams,
})

export const SignIn = () => {
    onForm = (createSession) => {
      return (
        <View>
          <Input
          placeholder='E-mail'
          onChangeText= {(text)=>{
            Store.dispatch( sessionActionCreators.addUserEmail(text));
          }}
          />
          <Input
            placeholder='Password'
            onChangeText= {(text)=>{
              Store.dispatch( sessionActionCreators.addUserPassword(text));
            }}
          />
          <Button
            onPress={() => {
              createSession({ 
                variables: { 
                  session: Store.getState().sessionCreateParams 
                }
              })
            }}
            title="Sign In"
            color="#841584"
          />
        </View>
      )
    };

    onCreateSession = (data) => {
      console.log(data);
      Store.dispatch(sessionActionCreators.addCurrentUser(data.createSession));
      return (
        <View>
          <Text>{Store.getState().currentUser.name}</Text>
        </View>
      )
    };


    return (
      <Mutation 
        mutation={SessionCreateMutation} 
      >
        {(createSession, { loading, error, data }) => (
          <View>
          {(data ? onCreateSession(data) : onForm(createSession))}  
          {loading && <Spinner />}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }

export default connect(mapStateToProps)(SignIn)