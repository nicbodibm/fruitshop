import React, { useEffect } from 'react'
import Auxi from '../../../hoc/Auxi/Auxi.js';
import classes from '../LoginBox/LoginBox.css';
import {Link} from 'react-router-dom'; 
// Login box for 
const loginBox = (props) => { 
    let incorrectAccount = null;
    let loginButton =  <button className={classes.btn} onClick={props.loginAccountHandler}>Login </button>
    if(props.incorrectAccount) { 
        incorrectAccount = <p className ={classes.incorrect}>Incorrect username or password</p>
    } 
    if (props.loggedIn){ 
        loginButton = <Link to='/shop' > 
        <button className={classes.btn} onClick={props.loginAccountHandler}>Login </button>
        </Link>
    }

    return (
            <div className={classes.container}>
                <input onKeyDown={props.handleKeyPressForLoginAccount}onChange ={props.userNameHandler}type="text" name="username" placeholder="Username" required></input>
                <input  onKeyDown={props.handleKeyPressForLoginAccount} onChange ={props.passwordHandler}type="password" name="password" placeholder="Password" required></input>
                {incorrectAccount}
                {loginButton}
                <button 
                    className={classes.btn}
                    onClick={props.clicked}>Create Account
                </button>
                <button 
                    className={classes.btn}
                    onClick={props.loginGuestHandler}>Login As Guest
                </button>
            </div>
            


    )
}

export default loginBox