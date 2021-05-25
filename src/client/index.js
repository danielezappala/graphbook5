import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme'
import client from './apollo';
import { ThemeProvider } from '@material-ui/core'
import {createGenerateClassName} from '@material-ui/styles'
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';

console.log('client: ', client)

function Main() {
  const generateClassName = createGenerateClassName();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <ApolloProvider client={client}>
      <JssProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
      </JssProvider>
    </ApolloProvider>
  );
}

//Server Side Rendering

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Main />,
  document.querySelector('#root')
);
