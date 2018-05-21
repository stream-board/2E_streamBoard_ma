
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { SessionDeleteMutation } from './../TypesDef'
import { Query } from 'react-apollo';
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
import { VALIDATE_SESSION_QUERY } from './../TypesDef';

export default class ValidateSession extends Component {
    constructor(props) {
      super(props);

      this.state = {
        auth: false,
        signIn: false
      }

      if(Store.getState().currentUser.token) {
        this.state = {
          auth: true,
          headersSession: {
            token : Store.getState().currentUser.token,
            uid : Store.getState().currentUser.email,
            client : Store.getState().currentUser.client
          }
        }
      } else {
        this.state.signIn = true;
      }
      this.queryJSX = this.queryJSX.bind(this);
    }

    queryJSX() {
      return (
        <Query query={VALIDATE_SESSION_QUERY} variables={this.state.headersSession}>
        {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <Text>{`Error: ${error}`}</Text>;
            if (data) {
              Store.dispatch(sessionActionCreators.addCurrentUser(data.createSession));
            }
        }}
        </Query>
      )
    }

    componentDidMount() {
      if(this.state.signIn) {
        return this.props.navigation.navigate('SignIn');
      } else {
        return this.props.navigation.navigate('Lobby');
      }
    }
    render() {
      if(this.state.auth) {
        return this.queryJSX();
      }
      return (<Spinner />);
    }
}