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
    onAddUser = (session) => {
      const {dispatch} = this.props

      dispatch(actionCreators.add(session))
    }

    /*onRemoveRoom = (index) => {
      const {dispatch} = this.props

      dispatch(actionCreators.remove(index))
    }*/
    
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

    onCreateUser = (data) => {
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
          let newUser = data.createSession;
        }}  
      >
        {(createUser, { loading, error, data }) => (
          <View>
          {(data ? onCreateUser(data) : onForm(createUser))}  
          {loading && <Spinner />}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    )
  }

export default connect(mapStateToProps)(SignIn)