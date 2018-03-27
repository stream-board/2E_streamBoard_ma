import React, { Component } from 'react';
import { AppRegistry, Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, createNetworkInterface, graphql } from 'react-apollo';

// Initialize the Apollo Client
const client = new ApolloClient({
    uri: 'http://192.168.99.101:5000'
});

// Define query types
const ChatQuery = gql`
  query chatMessages {
    chatMsgByRoomId(id:1) {
      message,
      sender
    }
  }
`;

class ChatMessage extends Component {

  renderChatMessage = ({message, sender}) => {
    return (
      <Text
        style={styles.messageContainer}
        >
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.sender}>{sender}</Text>
      </Text>
    )
  }

  render() {

    // Apollo injects the `data` prop, containing the result of our query,
    // and a loading indicator to tell us when the data is ready.
    const {data} = this.props
    const {loading, allChatMessage} = data

    // If we're loading, show a spinner.
    if (loading) {
      return <ActivityIndicator />
    }

    return (
      <View style={styles.feed}>
        {allChatMessage.map(this.renderChatMessage)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageContainer: {
    backgroundColor: '#00FFFF',
    padding: 16,
  },

  message: {
    color: '#FFFAF0',
  },

  sender: {
    color: '#FF1493',
  },
})

// Inject query response as `this.props.data`
const ChatWithData = graphql(ChatQuery)(ChatMessage)

// ApolloProvider lets us use Apollo Client in descendant components
const App = () => (
  <ApolloProvider client={client}>
    <ChatWithData />
  </ApolloProvider>
)

AppRegistry.registerComponent('App', () => App)
