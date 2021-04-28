import React, { Component, Fragment, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GlobalState from '../../store/globalState';

const SIGNUP = gql`
  mutation signup($email : String!, $password : String!, $username : String!) {
    signup(email : $email, password : $password, username : $username) {
    token
  }
}`;
 
 function SignupMutation(props) {

  const {globalState, globalDispatch} = useContext(GlobalState);
  console.log('GlobalState on signup ',globalState)
  const {children } = props;
  console.log('children on SignupMutation',children)
  const [data] = useMutation(SIGNUP);
  console.log('data signup ',data)

  return (
    <Mutation
        update = {(cache, {data: { signup }} ) => {
            if(signup.token) {
                localStorage.setItem('jwt', signup.token);
                console.log('localStorage ',localStorage.getItem('jwt'))
                globalDispatch({type:"SIGNUP"}) 
            }
        }}
      mutation={SIGNUP}>
        {(signup, { loading, error}) => 
          React.Children.map(children, function(child){
            return React.cloneElement(child, { signup, loading, error });
          })
        }
      </Mutation>
  )
}

export default SignupMutation


/*


import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GlobalState from '../../store/globalState';

const SIGNUP = gql`
  mutation signup($email : String!, $password : String!, $username : String!) {
    signup(email : $email, password : $password, username : $username) {
    token
  }
}`;

export default class SignupMutation extends Component {
    render() {
        const { children, changeLoginState } = this.props;
        return (
            <Mutation
                update = {(store, { data: { signup } }) => {
                    if(signup.token) {
                        localStorage.setItem('jwt', signup.token);
                        globalDispatch({type:"SIGNUP"}) 
                    }
                }}
                mutation={SIGNUP}
            >
                {(signup, { loading, error}) => 
                    React.Children.map(children, function(child) {
                        return React.cloneElement(child, { signup, loading, error });
                    })
                }
            </Mutation>
        )
    }
}

*/