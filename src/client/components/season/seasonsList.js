import React, { Component, useContext , Fragment} from 'react';
import GlobalState from "../../store/globalState"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PageHeader from '../appBar/myRouterBreadcrumbs'

export default function SeasonsList(props){

  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log("globalState.selectedSeason.id " + globalState.selectedSeason.id)
  console.log("props on SeasonsList " + JSON.stringify(props))
  return (
            <List>
              {props.seasons.map(item => (
                <ListItem key={item.id} onClick={() => props.handleClick(item)}>
                  <ListItemText >
                    <div>{item.id} - {item.name}</div>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
  )}
