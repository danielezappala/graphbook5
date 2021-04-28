import React, { Component, useContext, useEffect, useState } from 'react';
import Error from './error';
import LoginMutation from './mutations/login';
import RegisterMutation from './mutations/signup'
import Login_Signin from "./login_signin"
import GlobalState from "../store/globalState"
    
   
function LoginForm(props) {
    console.log('LoginForm props',props)
    const {children, error } = props;
    console.log('children on LoginForm',children)
    
    const {globalState, globalDispatch} = useContext(GlobalState);
    
    const login = (event) => {
        //event.preventDefault();
        props.login({
            variables: {
                email: globalState.email,
                password: globalState.password
            },
            errorPolicy:"all"
        });
    };
   
    /*
    const [state, setState] = React.useState({
        email: '',
        password: ''
    });
    */

    return <Login_Signin 
    mode={'Login'} 
    authFunction={login}
    error={error} 
    />
}

function RegisterForm(props) {
console.log('RegisterForm props',props)

    const [state, setState] = React.useState({
        email: '',
        password: '',
        username: '',
    });

    const signup = (event) => {
        event.preventDefault();

        props.signup({
            variables: {
                email: state.email, 
                password: state.password, 
                username: state.username
            }
        });
    }
return <Login_Signin 
    mode={'Sign Up'} 
    authFunction={signup}
    error={props.error}/>
}

function LoginRegisterForm(props){
    const {globalState, globalDispatch} = useContext(GlobalState);
    console.log('Global State on LoginRegisterForm ', globalState)
useEffect(()=>{

},[]) 
    console.log('LoginRegisterForm props ', props)
    return (
            <div className="authModal">
                {globalState.showLogin && (
                    <div>
                        <LoginMutation>
                            <LoginForm/>
                        </LoginMutation>
                    </div>
                )}
                {!globalState.showLogin && (
                         <div>
                        <RegisterMutation>
                            <RegisterForm/>
                        </RegisterMutation>
                             </div>
                )}
            </div>
        )
    }
export default LoginRegisterForm