import React, { useEffect, useContext } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
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
        <div>
          nome: {globalState.selectedSeason.name}
        </div>
      </CardContent>
    </Card>
    )};
