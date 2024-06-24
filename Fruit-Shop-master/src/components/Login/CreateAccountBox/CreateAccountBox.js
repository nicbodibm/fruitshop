
import React from 'react'
import Auxi from '../../../hoc/Auxi/Auxi.js';
import classes from '../LoginBox/LoginBox.css';

// The UI when a user wants to create an account. 
const createAccountBox = (props) => { 
    let state = {
        accounts: null,
        loginAccount: { // This variable is just to ensure the user entered the user/pass. Not passed to ProductPage
            userName: null,
            password: null
        }
    }


    console.log(props.newAccount)
    let userNameTakenNotification = null; 
    if(props.showUserNameTakenNotification === true) { 
        userNameTakenNotification = <p className ={classes.incorrect}>Username already taken!</p>
    }
    let invalidFieldNotification = null; 
    if(props.showInvalidFieldNotification === true) { 
        invalidFieldNotification = <p className ={classes.incorrect}>One or more fields are empty!</p>
    }

    return ( 
        <Auxi>
            <div className={classes.container}>
                <input onKeyDown={props.handleKeyPressForCreateAccountBox}onChange={props.newUserNameHandler} type="text" name="username" placeholder="Username" required></input>
                <input onKeyDown={props.handleKeyPressForCreateAccountBox}onChange={props.newPasswordHandler} type="password" name="password" placeholder="Password" required></input>
                <input onKeyDown={props.handleKeyPressForCreateAccountBox}onChange ={props.newNameHandler}type="text" name="name" placeholder="Name" required></input>
                <input onKeyDown={props.handleKeyPressForCreateAccountBox}onChange ={props.newLastNameHandler}type="text" name="lastName" placeholder="Last Name" required></input>
                <input onKeyDown={props.handleKeyPressForCreateAccountBox}onChange={props.newAddressHandler} type="address" name="address" placeholder="Address" required></input>
                {userNameTakenNotification}
                {invalidFieldNotification}
                <button className={classes.btn}onClick={props.createAccountHandler}>Create Account</button>
            </div>
        </Auxi>

    )
}

export default createAccountBox