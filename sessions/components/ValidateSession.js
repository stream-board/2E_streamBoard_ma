
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
  Label,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';
import { sessionActionCreators } from "./../sessionsRedux";
import { asyncWrapFunction } from './../../utils';

export default class ValidateSession extends Component {
    constructor(props) {
         if(Store.getState().currentUser.token) {
             
         }

    }

    render() {
    <Mutation 
        mutation={SessionDeleteMutation}
      >
        {(deleteSession, { loading, error, data }) => (
          <View>
          {(data ? this.onDeleteSession(data) : this.onForm(deleteSession))}
          {error && <Text> Error: ${error}</Text>}  
          </View>
        )}
      </Mutation>
    }
}