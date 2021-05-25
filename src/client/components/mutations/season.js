import React, { Component, Fragment, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GlobalState from '../../store/globalState';
import { LabelOffSharp } from '@material-ui/icons';



const ADD_SEASON = gql`
  mutation addSeason($name : String!, $startDate : Date!) {
    addSeason(name : $name, startDate : $startDate) {
      id
      name
      startDate
    }
 }`;
 
 function AddSeasonMutation(props) {
  console.log('LoginMutation props',props)
  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log('GlobalState on login ',globalState)
  const {children } = props;
  console.log('children on LoginMutation',children)
  const [data] = useMutation(ADD_SEASON);
  console.log('data season ',data)

  return (
    <Mutation
        update = {(cache, {data: { season }} ) => {
          refetchQueries: [
            { query: GET_SEASONS }
          ]
          /*
          cache.writeQuery({
            query: GET_SEASONS,
            data: { seasons: seasons.concat([season],...rest) },
          });
          */
          /*
            if(login.token) {
                console.log('season in mutation',season)
                
                //globalDispatch({type:"SEASON"}) 
            }
          */
        }}
      mutation={ADD_SEASON}>
        
        {(season, { loading, error}) =>
          React.Children.map(children, function(child){
            return React.cloneElement(child, { season, loading, error });
          })
        }
      </Mutation>
  )
}

export default AddSeasonMutation


