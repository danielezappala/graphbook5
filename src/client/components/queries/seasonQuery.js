
import React, { Component, useContext } from 'react';
import { Query } from "react-apollo";
import Loading from '../loading';
import Error from '../error';
import gql from "graphql-tag";
import GlobalState from "../../store/globalState"
import Card from '@material-ui/core/Card';

const GET_SEASON = gql`
  query season($id: ID!) { 
    season(id:$id){
      name
      startDate
    }
  }
`;

const SeasonQuery = ((props) => {
  console.log('props on SeasonQuery ' + JSON.stringify(props.season))
  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log('Global State on SeasonQuery',globalState)
  var id = props.season.id || 1
        return(
            <Query query={GET_SEASON} 
              variables={{id}}>

              {({ loading, error, data }) => {
                  if (loading) return <Loading />;
                  if (error) return <Error><p>{error.message}</p></Error>;
                  const { season } = data;
                  return (
                    <Card>{season.startDate}</Card>
                  )
              }}
              
            </Query>
        )
})
export default SeasonQuery
