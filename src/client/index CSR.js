import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import { CssBaseline } from '@material-ui/core';

console.log('client: ',client)

ReactDOM.render(

    <ApolloProvider client={client}>
        <CssBaseline>
            <App/>
        </CssBaseline>
    </ApolloProvider>
, document.getElementById('root'));
