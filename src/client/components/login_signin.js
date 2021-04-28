import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Error from './error'
import GlobalState from "../store/globalState"
import AlertMessage from "./AlertMessage";
import GoogleLogin from 'react-google-login'
import { Formik, Form, useFormik } from 'formik'
import * as yup from 'yup'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: "100%",
    height: '100vh',

  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    //width: '450px',
    margin: theme.spacing(8, 4),
    display: 'block',
    flexdirection: 'column',
    alignitems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    //display:'block',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    marginLeft: theme.spacing(0) // risolve un disallineamento del checkbox
  }
}));

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(1, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login_Signin(props) {
  console.log('Login_Signin props', props)

  console.log('children on Login_Signin', children)

  const { error, authFunction, children, errorMessage } = props;
  const { globalState, globalDispatch } = useContext(GlobalState);

  console.log('Global State on login_signin ', globalState)

  const classes = useStyles();

  const responseGoogle = (response) => {
    //globalDispatch({ type: "SETUSEREMAIL", payload: response.profileObj.email })
    console.log(globalState.email)
  }
  const formik = useFormik({
    initialValues: {
      email: globalState.email,
      password: globalState.password
    },
    validationSchema: validationSchema, 
    onSubmit: (event) => {
      authFunction(event)
    }
  })

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {props.mode}
          </Typography>

              <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
                <TextField
                  type="email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  value={globalState.email}
                  onChange={(event) => {
                    globalDispatch({type: "SETUSEREMAIL", payload:event.target.value})
                  }}
                  
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}    
                />
                 <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  value={globalState.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  onChange={(event) => {
                    globalDispatch({type: "SETUSERPASSWORD", payload:event.target.value})
                  }}
                />
                {props.mode === 'Sign Up' ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    autoComplete="current-username"
                    type="username"
                    //onChange={(event) => setParentState({...parentState, username: event.target.value})} 
                  />) :
                  (<div></div>)}
                <FormControlLabel
                  className={classes.label}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {props.mode}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                </Link>
                  </Grid>
                  <Grid item>
                    {props.mode === 'Sign Up' ? (
                      <Link href="#" variant="body2" onClick={(event) => { globalDispatch({ type: "SHOWLOGIN" }) }}>
                        {"Have already an account? Login"}
                      </Link>
                    ) : (
                        <Link href="#" variant="body2" onClick={(event) => { globalDispatch({ type: "SHOWSIGNUP" }) }}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      )}
                  </Grid>
                </Grid>

                <Box mt={10}>
                  <Typography>
                    Login with Google
              </Typography>
                  <GoogleLogin
                    clientId="5946943886-0hklpm4l7up7l5d8cpn72a4d6vuncgcj.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </Box>

                <Box mt={10}>
                  <Copyright />
                  {error && <AlertMessage message={error.message} />}
                </Box>

              </form>
        </div>
      </Grid>
    </Grid>
  );
}
