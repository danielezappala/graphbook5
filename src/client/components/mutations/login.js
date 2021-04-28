import React, { Component, Fragment, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GlobalState from '../../store/globalState';
import { LabelOffSharp } from '@material-ui/icons';


const LOGIN = gql`
  mutation login($email : String!, $password : String!) {
    login(email : $email, password : $password) {
      token
    }
 }`;
 
 function LoginMutation(props) {
  console.log('LoginMutation props',props)
  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log('GlobalState on login ',globalState)
  const {children } = props;
  console.log('children on LoginMutation',children)
  const [data] = useMutation(LOGIN);
  console.log('data login ',data)

  return (
    <Mutation
        update = {(cache, {data: { login }} ) => {
            if(login.token) {
                console.log('login in mutation',login)
                localStorage.setItem('jwt', login.token);
                console.log('localStorage ',localStorage.getItem('jwt'))
                globalDispatch({type:"LOGIN"}) 
            }
        }}
      mutation={LOGIN}>
        
        {(login, { loading, error}) =>        
          React.Children.map(children, function(child){
            return React.cloneElement(child, { login, loading, error });
          })
        }
      </Mutation>
  )
}

export default LoginMutation


