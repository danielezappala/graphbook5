import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
console.log('localStorage', localStorage)

const AuthLink = (operation, next) => {
  console.log('operation before ', operation)
  const token = localStorage.getItem('jwt');

  if (token) {
    operation.setContext(context => (
      {
        ...context,
        headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
        },
      })
    );
    console.log('context after ', operation.getContext())
  }

  return next(operation);
};

console.log('Authlink ', AuthLink)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          if (extensions.code === 'UNAUTHENTICATED') {
            alert('UNAUTHENTICATED')
            localStorage.removeItem('jwt');
            client.resetStore()
          }
          console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`);
        });
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    AuthLink,
    new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});
console.log('client.link ', client.link)
console.log('client.cache ', client.cache)
export default client;