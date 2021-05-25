
import React, { Component, useContext } from 'react';
import { Query } from "react-apollo";
import { useQuery } from '@apollo/client'
import Loading from '../loading';
import Error from '../error';
import gql from "graphql-tag";
import GlobalState from "../../store/globalState"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const GET_SEASONS = gql`
  query seasons { 
    seasons{
      id
      name
    }
  }
`;


const SeasonsQuery = ((props) => {
  console.log('props on SeasonQuery ' + props)
  const { globalState, globalDispatch } = useContext(GlobalState);
  console.log('Global State on SeasonQuery', globalState)
  
  const {children} = props
  const handleClick = item => {
    globalState.selectedSeason = item;
    globalDispatch({ type: "SELECTED_SEASON", payload: globalState.selectedSeason })
    console.log(globalState.selectedSeason)
  } 
  return (
    <Query query={GET_SEASONS}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error><p>{error.message}</p></Error>;
        
        const { seasons } = data;
        console.log('seasons ' + seasons)
          return React.Children.map(children, function(child){
            return React.cloneElement(child, { seasons, loading, error, handleClick });
          })
      }}
    </Query>
  )
})
export default SeasonsQuery
