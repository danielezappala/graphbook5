import React, { Component, useContext } from 'react';
import { Query } from "react-apollo";
import Loading from '../loading';
import Error from '../error';
import gql from "graphql-tag";
import GlobalState from "../../store/globalState"

const GET_CURRENT_USER = gql`
  query currentUser { 
    currentUser { 
      id
      username
      avatar
      firstName
      lastName
      fullName
      abbreviation
    }
  }
`;

const CurrentUserQuery = ((props) => {

  const {globalState, globalDispatch} = useContext(GlobalState);
    
  console.log('Global State on CurrentUserQuery'),globalState

        const { children } = props;
        return(
            <Query query={GET_CURRENT_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error><p>{error.message}</p></Error>;
                    const { currentUser } = data;
                    console.log('currentUser in CurrentUserQuery',currentUser)
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { currentUser });
                    })
                }}
            </Query>
        )
})

export default CurrentUserQuery