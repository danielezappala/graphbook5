import React, { Component, Fragment, useReducer, useEffect, useState } from 'react';

// from paroliere
import './assets/css/App.css';
import dice from './data'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme.js';
import Ui from '../client/components/ui'
import GlobalState from '../client/store/globalState';
import reducer from "../client/store/reducer"
// from graphbook
import { Helmet } from 'react-helmet';
//import './assets/css/style.css';
import './components/fontawesome';
import LoginRegisterForm from '../client/components/loginregister'
import CurrentUserQuery from '../client/components/queries/currentUser';
import { withApollo } from "react-apollo";

// paroliere

const initialAppGlobalState = {
    isSettingsDialogOpen: false,
    loggedIn: false,
    showLogin: true,
    email:'danielezappala@scenariopubblico.com',
    password:'1',
    messageError: null,
    appSettings:{title:'appTitle'}
};

const App = (props) => {
    console.log('App props',props)
    const [globalState, globalDispatch] = useReducer(reducer, initialAppGlobalState)
    const [unsubscribe, setUnsubscribe] = useState()

    useEffect(() => {
        setUnsubscribe(props.client.onResetStore(
            () => setLoggedIn(false)
        ));
        return () => { console.log("componentWillUnmount"); }
    }, []);

    return (
        <Fragment>
            <Helmet>
                <title>Graphbook - Feed</title>
                <meta name="description" content="Newsfeed of all your friends on Graphbook" />
            </Helmet>
            <GlobalState.Provider value={{ globalState, globalDispatch }}>
            {globalState.loggedIn ?   
            <ThemeProvider theme={theme}>
                    <CurrentUserQuery >
                        <Ui display="block" />
                    </CurrentUserQuery>
            </ThemeProvider>
                : <LoginRegisterForm/>
            }
         </GlobalState.Provider>
    </Fragment>
    )
}

export default withApollo(App)
