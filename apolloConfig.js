import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const wsLink = new WebSocketLink({
    uri: `ws://35.190.138.158/subscriptions`,
    options: {
        reconect: true
    }
});

const httpLink = new HttpLink({
    uri: 'http://35.190.138.158/graphql'
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query); 
        return kind === "OperationDefinition" && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
        },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
}
export default Client = new ApolloClient({
    link,
    onError: (e) => { console.log(e.graphQLErrors) },
    cache: new InMemoryCache({
        dataIdFromObject: object => {
            switch(object.__typename) {
                case 'Room': return object.idRoom;
                case 'ChatMessage': return object.id;
                case 'owner': return object.id;
                default: return defaultDataIdFromObject(object);
            }
        }
    }),
    defaultOptions: defaultOptions,
})
