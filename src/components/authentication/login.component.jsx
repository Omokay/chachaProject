import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import hero from '../../assets/hero.png';
import {baseUrl, httpPost} from "../../httpRequest/axios";
import {StrapiContext} from '../../context/processContext';
import Alerts from "../Alerts/alerts.component";

import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${hero})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    header: {
      margin: 'auto auto',
      width: 'auto',
      alignVertical: 'center',
    },
    paper: {
        // margin: theme.spacing(8, 4),
        margin: '0 auto',
        display: 'flex',
        paddingTop: '200px',
        flexDirection: 'column',
        maxWidth: '400px',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [authView, setAuthView] = useState('signin');
    const [authToken, setAuthToken] = useState('');
    const { setMod, setInfo, setError, error, info } = useContext(StrapiContext);

    // Using state change to change views between register and sign in.
    const changeView = () =>  {
        (authView !== 'signin') ?  setAuthView('signin') :  setAuthView('signup');
    };

   /**
    *   SignIn Handlers
    *
    * */

   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (username, password) => {
        httpPost(`${baseUrl}auth/local/`, {
            'identifier': username,
            'password': password,
        })
            .then((res) => {
                if (res.jwt) {
                    Cookies.set('authCookie', res.jwt);
                    setAuthToken(res.jwt);
                    console.log(authToken);

                    history.push('/homepage');
                } else {
                    console.log(res.message);
                }
            });
    }

    /***
     *  SignUp Handlers
     *
     * */

    const [newUser, setNewUser] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmedPass] = useState('');

    const handleNewEmail = (event) => {
        event.preventDefault();
        setNewEmail(event.target.value);
    }

    const handleNewUser = (event) => {
        event.preventDefault();
        setNewUser(event.target.value);
    }

    const handleNewPass = (event) => {
        event.preventDefault();
        setNewPass(event.target.value);
    };

    const handlePasswordConfirmation = (event) => {
      event.preventDefault();
      setConfirmedPass(event.target.value);
    };

    const handleSignup = () => {
        if (newPass !== confirmPass) {
            console.log('Password does not match');
        }  else if (!newEmail || !newPass || !confirmPass) {
            console.log('All inputs are required');
        } else {
            httpPost(`${baseUrl}auth/local/register`, {
                'username': newUser,
                'email': newEmail,
                'password': newPass,

            }).then((res) => {
                console.log(res);
            })
        }
    };

    // Handle Error Messages
    const handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setError(null);
            setMod(false);
            setInfo(null);
        }
        setError(null);
        setInfo(null);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
            </Grid>
            {
                (authView === 'signin') ?
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            {/*<form className={classes.form}>*/}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    value={username}
                                    onChange={handleUsername}
                                    label="Email "
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={password}
                                    onChange={handlePassword}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox value="remember" color="primary" />}*/}
                                {/*    label="Remember me"*/}
                                {/*/>*/}
                                <Button
                                    type="submit"
                                    onClick={() => handleLogin(username, password)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        {/*<Link href="/register" variant="body2">*/}
                                        {/*    {"Don't have an account? Sign Up"}*/}
                                        {/*</Link>*/}
                                        <a type='button' onClick={changeView}>
                                            {'Don\'t have an account? Sign Up'}
                                        </a>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    {/*<Copyright />*/}
                                </Box>
                            {/*</form>*/}
                        </div>
                    </Grid>
                 :
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign UP
                            </Typography>
                            {/*<form className={classes.form}>*/}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    value={newEmail}
                                    onChange={handleNewEmail}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="newUser"
                                    value={newUser}
                                    onChange={handleNewUser}
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={newPass}
                                    onChange={handleNewPass}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    value={confirmPass}
                                    onChange={handlePasswordConfirmation}
                                    label="Retype password"
                                    type="password"
                                    id="pass"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    onClick={handleSignup}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        <a type='button' onClick={changeView}>
                                            {"Already have an account? Sign In"}
                                        </a>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    {/*<Copyright />*/}
                                </Box>
                            {/*</form>*/}
                        </div>
                    </Grid>


            }

            {
                (error !== null) ?
                    <Alerts
                        open={true}
                        severity='error'
                        duration='2000'
                        errorMessage={error}
                        handleClose={handleAlert} /> :
                    (info !== null) ?

                        <Alerts
                            open={true}
                            severity='success'
                            duration='3000'
                            errorMessage={info}
                            handleClose={handleAlert}

                        /> : null
            }
        </Grid>
    );
}
