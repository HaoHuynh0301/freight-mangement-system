import React from 'react';
import { withStyles } from '@material-ui/styles';
import st from './styles/login.style';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {
    Link
} from 'react-router-dom';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        let { classes } = this.props;
        return(
            <div className = {classes.container}>
                <div className = {classes.formContainer}>
                    <Typography variant = 'h3' className = {classes.titleTextField}>Login</Typography>
                    <div className = {classes.inputContainer}>
                        <Typography className = {classes.inTitleTextField}>Username</Typography>
                        <TextField
                            id="userName"
                            label="Type your username"
                            type="search"
                            variant="filled"
                            className = {classes.inputTextField}
                        />
                    </div>
                    <div className = {classes.inputContainer}>
                        <Typography className = {classes.inTitleTextField}>Password</Typography>
                        <TextField
                            id="password"
                            label="Type your password"
                            type="password"
                            variant="filled"
                            className = {classes.inputTextField}
                        />
                    </div>
                    <Link className = {classes.forgotPassTextField} to = '#'>Forgot password ?</Link>
                    <div className = {classes.integrationContainer}>
                        <Typography>Hello</Typography>
                    </div>
                    <Button variant="contained" className = {classes.loginBtn}>Login</Button>
                    <div className = {classes.signUpContainer}>
                        <Typography className = {classes.signUpTxtField}>Or sign up using</Typography>
                        <Link to = '/' className = {classes.signUpBtn}>SIGN UP</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(st)(LoginComponent);