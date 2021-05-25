import React, { Fragment, useState, useContext, useEffect} from 'react';
import PrimarySearchAppBar from './appBar/myAppBar'
import { Grid, Typography, Box, Paper} from '@material-ui/core'
import GlobalState from "../store/globalState"
//import '@fontsource/roboto';
import {makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes } from './routing/Routes'
import { PageHeader } from './appBar/myRouterBreadcrumbs';


const useStyles = makeStyles((theme) => ({
    root: {
       display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paper: {
      padding: 50,
      height:'100%',
      marginTop: 50
    },
    wrapper:{
      height: "100vh"
    },
    card: {
      height:'100%'
    }
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
           <div className={classes.wrapper}>
           <Router>
         
            <PrimarySearchAppBar currentUser={props.currentUser}/>
            <Paper className={classes.paper}>
              <Routes />
            </Paper>
         
          </Router>
          </div>
        </Fragment>

    )})

export default Ui