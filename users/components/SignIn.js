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

const mapStateToProps = (state) => ({
  queryParams: state.queryParams,
})

export const SignIn = () => {
    onAddSession = (session) => {
      const {dispatch} = this.props

      dispatch(actionCreators.add(session))
    }
    
    onForm = (createSession) => {
      return (
        <View>
          <Input
          placeholder='email'
          onChangeText= {(text)=>{
            Store.dispatch( { type:'addUserEmail', payload: text })
          }}
          />
          <Input
            placeholder='Password'
            onChangeText= {(text)=>{
              Store.dispatch( { type:'addUserPassword', payload: text })
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
      return (
        <View>
          <Text>Redirección RoomsDetail roomId={1}</Text>
        </View>
      )
    };


    return (
      <Mutation 
        mutation={SessionCreateMutation}
        update={(cache, { data: data })=>{
          let newSession = data.createSession;
        }}  
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