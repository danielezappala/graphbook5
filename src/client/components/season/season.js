import React, { useEffect, useContext } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
  import MoneyIcon from '@material-ui/icons/Money';
  import { red } from '@material-ui/core/colors';
  import GlobalState from "../../store/globalState"
 
  export default function SeasonDetail(props){
    const {globalState, globalDispatch} = useContext(GlobalState);
    
    return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        Season detail
        <SeasonQuery/>
      </CardContent>
    </Card>
    )};
