import React, { Component, useContext } from 'react';
import { withApollo } from "react-apollo";
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import GlobalState from '../store/globalState'

console.log('from logout',GlobalState)

function Logout(props) {

  console.log(props)
  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log('GlobalState on Logout ',globalState)

  const clickLogout = (e) => {
    console.log('clicked')
    localStorage.removeItem('jwt');
    globalDispatch({type:"LOGOUT"}) 
    props.client.resetStore();
  }
    return (
      <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={(e) => clickLogout()}
              color="inherit"
      >
        <LogoutIcon/>
      </IconButton>
    );
  }

export default withApollo(Logout);