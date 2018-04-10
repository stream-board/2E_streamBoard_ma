import React from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
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

export const SignIn = () => {
    onForm = (createSession) => {
      return (
        <Container>
          <Title style={styles.titleElement}>HLA</Title>

          <Item style={styles.formElement}>
            <Label>Email</Label>
            <Input
            onChangeText= {(text)=>{
              Store.dispatch( sessionActionCreators.addUserEmail(text));
            }}
            />
          </Item>

          <Item style={styles.formElement}>
          <Input
            placeholder='Password'
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
          ><Text>INGRESAR</Text></Button>
        </Container>
      )
    };

    onCreateSession = (data) => {
      console.log(data);
      Store.dispatch(sessionActionCreators.addCurrentUser(data.createSession));
      //console.log(this.props.navigation.navigate('MainMenu'))
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