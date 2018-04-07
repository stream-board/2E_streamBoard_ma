import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

export default Client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://192.168.0.28:5000/graphql'
    }),
    cache: new InMemoryCache({
        // TODO: others objects for other mutations or querys
        dataIdFromObject: object => {
            switch(object.__typename) {
                case 'Room': return object.idRoom;
                case 'ChatMessage': return object.id;
                default: return defaultDataIdFromObject(object);
            }
        }
    })
})