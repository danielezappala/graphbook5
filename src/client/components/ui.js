import React, { Fragment, useState, useContext, useEffect} from 'react';
import PrimarySearchAppBar from './myAppBar'
import HomePage from './pages/homePage'
import { Button, Typography, Box, Paper} from '@material-ui/core'
import GlobalState from "../store/globalState"
import '@fontsource/roboto';
import {makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

const Ui = ((props) => {
    console.log('props on Ui',props)
    const {globalState, globalDispatch} = useContext(GlobalState);
    
    console.log('Global State on UI')
   
    useEffect(()=>{
    
    },[]) 
    
    
    const classes = useStyles();
    return (
        
        <Fragment>
            <PrimarySearchAppBar currentUser={props.currentUser}/>
            <HomePage/>
        </Fragment>
    )})

export default Ui