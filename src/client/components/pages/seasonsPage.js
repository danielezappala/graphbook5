import React, { Fragment, useContext, useEffect } from 'react';
import { makeStyles, useTheme, ThemeProvider, CssBaseline  } from '@material-ui/core/styles';
import SeasonsQuery from '../queries/seasonsQuery'
import GlobalState from "../../store/globalState"
import { Grid, Typography } from '@material-ui/core';
import SeasonDetail from '../season/seasonDetail'
import SeasonsList from '../season/seasonsList'
import SeasonAdd from '../season/seasonAdd'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {NavLink} from 'react-router-dom'
import PageHeader from '../appBar/myRouterBreadcrumbs'




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));


export default function SeasonsPage(){

  const classes = useStyles();
  const theme = useTheme();
  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add'
  }
  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log("globalState.selectedSeason.id " + globalState.selectedSeason.id)
  
  return (
    <div>
        <Grid container>
          <Grid item xs>
            <SeasonsQuery>
              <SeasonsList/>
            </SeasonsQuery>
          </Grid>
          <Grid item xs>
              <SeasonDetail season={globalState.selectedSeason}/>
          </Grid>
          <Grid>
            <NavLink to="/addSeason">
              <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
                {fab.icon}
              </Fab>
            </NavLink>
          </Grid>
        </Grid>
        </div>
    )}; 