import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

export default Client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://35.190.138.158/graphql'
    }),
    onError: (e) => { console.log(e.graphQLErrors) }, // Works
    cache: new InMemoryCache({
        // TODO: others objects for other mutations or querys
        dataIdFromObject: object => {
            console.log(object)
            switch(object.__typename) {
                case 'Room': return object.idRoom;
                case 'ChatMessage': return object.id;
                default: return defaultDataIdFromObject(object);
            }
        }
    })
})
