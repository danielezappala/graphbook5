import React, { Component, Fragment, useReducer, useEffect, useState } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
//import Router from './components/routing/Routes'

import Ui from './components/ui'
import GlobalState from './store/globalState';
import reducer from "./store/reducer"

import { Helmet } from 'react-helmet';
//import './assets/css/style.css';
//import './components/fontawesome';
import LoginRegisterForm from './components/loginregister'
import CurrentUserQuery from './components/queries/currentUser';
import { withApollo } from "react-apollo"
//import CssBaseline from '@material-ui/core/CssBaseline';


// paroliere

function isLoggedIn() {
    if (typeof window !== 'undefined'){
        
        if (localStorage.getItem('jwt')) {
            return true
        }
        else {
            return false
        }
    }
}

const initialAppGlobalState = {
    isSettingsDialogOpen: false,
    loggedIn: isLoggedIn(),
    showLogin: true,
    email: '',
    password: '',
    messageError: null,
    appSettings: { title: 'App Title' },
    seasons: [],
    selectedSeason: {},
    selectedPageUrl: ['/homepage']
};

const App = (props) => {
    console.log('App props', props)
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
                            <CurrentUserQuery >
                                <Ui display="block" />
                            </CurrentUserQuery>
                            : <LoginRegisterForm />
                        }
                    </GlobalState.Provider>
        </Fragment>
    )
}
export default withApollo(App)