import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi.js';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import LoginBox from '../../components/Login/LoginBox/LoginBox'
import CreateAccountBox from '../../components/Login/CreateAccountBox/CreateAccountBox'
import LoggedInNotification from '../../components/Login/LoggedInNotification/LoggedInNotification'
import CreatedAccountNotification from '../../components/Login/CreatedAccountNotification/CreatedAccountNotification'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Link, Redirect, Route} from 'react-router-dom'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//Login page that contains a LoginBox where users can create an account or login. Shows a notification if 1. wrong username/password is inputted 2. Created an account successfully
class LoginPage extends Component { 
    state = {
        accounts: null,
        loginAccount: { // This variable is just to ensure the user entered the user/pass. Not passed to ProductPage
            userName: null,
            password: null
        },
        loggedInAccount: null, // This account will be passed as props to ProductPage
        newAccount: {
            name: null, 
            lastName: null,
            userName: null,
            password: null,
            address: null
        }, 
        createBoxClicked: false,
        loading: false,
        createdAccount: false,
        loggedIn: false,
        userNameTaken: false,
        verifyLogin: false,
        verifyCreatedAccount: false,
        incorrectAccount: false,
        showUserNameTakenNotification: false, 
        showInvalidFieldNotification: false, 
        invalidFieldForNewAccount: false
    }
    constructor(props) { 
        super(props);
        this.createAccountHandler = this.createAccountHandler.bind(this);
    }
    //Get information (user and pass) of all accounts from the server.
    componentDidMount () {
        axios.get( 'https://fruit-website.firebaseio.com/accounts.json' )
            .then( response => {
                if(response.data== null) { 
                    this.setState( { accounts: []} );

                } else{
                this.setState( { accounts: response.data } );
                }
            } )
            .catch( error => {
            } );
    }
    // Updates the 'password' state when the user types on the 'password' textbox
    passwordHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    } 

    // Updates the 'username' state when the user types on the 'username' textbox
    userNameHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    }     
    // Verifies if the inputted username and password are correct when the 'Login' button is clicked
    loginAccountHandler = async() => {
        this.setState( {loading:true}); 
        const response = await axios.get( 'https://fruit-website.firebaseio.com/accounts.json' )
        .then( response => {
            if(response.data== null) { 
                this.setState( { accounts: []} );
            } else{
            this.setState( { accounts: response.data } );
            }
        } )
        .catch( error => {
        } );
        this.setState( {loading:false}); 

        Object.keys(this.state.accounts).forEach(key => {
            if(this.state.accounts[key].userName == this.state.loginAccount.userName && this.state.accounts[key].password == this.state.loginAccount.password) { 
                this.setState({loggedIn: true, verifyLogin: true, account: this.state.accounts[key]})
                console.log(this.state.account); 
            }
          });
          if(this.state.verifyLogin == false) { 
              this.setState({incorrectAccount:true}) 
          }
    }
    loginGuestHandler = async () => { 
        let guestAccount = {address: "123 Guest Street", lastName: "Mess", name: "Guest", password: "guestPass", userName: "guestUser"}
        this.setState({loggedIn: true, verifyLogin: true, account: guestAccount})

    }
    handleKeyPressForLoginAccount(event) { 
        if (event.key === 'Enter') {
            this.loginAccountHandler(); 
        }
    }
    // Changes 'username' state for a new user whenever a 'username' is inputted
    newPasswordHandler = async event => {
        let accountCopy = {...this.state.newAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );

    }
    // Changes 'password' state for a new user whenever a 'password' is inputted
    newUserNameHandler = async event => {
        let accountCopy = {...this.state.newAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );

    }
    newNameHandler = async event => {
        let accountCopy = {...this.state.newAccount}
        accountCopy.name = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );

    }
    newLastNameHandler = async event => {
        let accountCopy = {...this.state.newAccount}
        accountCopy.lastName = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );

    }
    newAddressHandler = async event => {
        let accountCopy = {...this.state.newAccount}
        accountCopy.address = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );
    }
    // Verifies if the user inputted the fields correctly i.e. unique username and creates a new account and add it's to the database when the 'Create Account' button is clicked inside the CreateAccountBox popup
    createAccountHandler = async (event) => {
        console.log("username taken?",this.state.userNameTaken)
        for (let key of Object.keys(this.state.accounts)) {
            console.log("current account username",this.state.accounts[key].userName)
            console.log("new account username",this.state.newAccount.userName)
            console.log("same?",  this.state.accounts[key].userName === this.state.newAccount.userName                    )
            if(this.state.accounts[key].userName === this.state.newAccount.userName) { 
                await this.setState({userNameTaken:true}, () => {
                    console.log("setting username taken to true", this.state.userNameTaken);
                  }); 
                await this.setState({showUserNameTakenNotification:true})
                break;
            }
          }
        if(this.state.userNameTaken === false) { 
            await this.setState({showUserNameTakenNotification:false})
        }
        for (const [key, value] of Object.entries(this.state.newAccount)) {
            if(value === null) { 
                await this.setState({showInvalidFieldNotification: true}); 
                await this.setState({invalidFieldForNewAccount: true}); 
                break;
            }
        }
        if(this.state.invalidFieldForNewAccount === false) { 
            await this.setState({showInvalidFieldNotification:false})
        }
        if(this.state.userNameTaken === false && this.state.invalidFieldForNewAccount === false) { 
            await this.setState ({createBoxClicked : false, verifyCreatedAccount: true})

            axios.post( '/accounts.json', this.state.newAccount )
                .then( response => {
                } )
                .catch( error => {
                } );
            }
            await this.setState({userNameTaken:false})
            await this.setState({invalidFieldForNewAccount:false})


    }
    handleKeyPressForCreateAccountBox(event) { 
        if (event.key === 'Enter') {
            this.createAccountHandler(); 
        }
    }
    // Opens the CreateAccountBox popup when 'Create Account' is clicked 
    openCreateAccountBoxHandler = () => {
        this.setState( { createBoxClicked: true } );
    }
    // Changes the state of verifyLogin to false so that we can use this value to close the LoginBox container 
    verifyLogin = () => { 
        this.setState({verifyLogin: false})
    }
    // Changes the state of verifyLogin to false so that we can use this value to close the LoginBox container 
    verifyCreatedAccount = () => { 
        this.setState({verifyCreatedAccount: false})
    }
    closeCreateBoxClicked() { 
        this.setState({
            createBoxClicked: false
        }) 
    }
    render () {
        let createAccountBox = <CreateAccountBox showInvalidFieldNotification={this.state.showInvalidFieldNotification}showUserNameTakenNotification={this.state.showUserNameTakenNotification}newAccount={this.state.newAccount}handleKeyPressForCreateAccountBox={this.handleKeyPressForCreateAccountBox.bind(this)}newLastNameHandler={this.newLastNameHandler}newNameHandler={this.newNameHandler}newAddressHandler = {this.newAddressHandler}newUserNameHandler = {this.newUserNameHandler} newPasswordHandler = {this.newPasswordHandler} createAccountHandler = {this.createAccountHandler}/>
        let loginBox = <LoginBox loginGuestHandler={this.loginGuestHandler} handleKeyPressForLoginAccount = {this.handleKeyPressForLoginAccount.bind(this)}incorrectAccount = {this.state.incorrectAccount}clicked = {this.openCreateAccountBoxHandler} userNameHandler = {this.userNameHandler} passwordHandler = {this.passwordHandler} loggedIn = {this.state.loggedIn}loginAccountHandler = {this.loginAccountHandler}></LoginBox>
        let loggedinNotification = <LoggedInNotification clicked={this.verifyLogin}/>
        let createdAccountNotification = <CreatedAccountNotification clicked={this.verifyCreatedAccount}></CreatedAccountNotification>
        if(this.state.loggedIn) { 
          return <Redirect to={{
            pathname:"/shop" ,
            state: { account: this.state.account }
          }}/> 

        } 
        let spinner = <Spinner />;

        {/* LoginPage returns a LoginBox with popups that show up when specific conditions are met i.e. user clicks 'Create Account' button*/}
        return (
            <Auxi>
                <Modal show={this.state.loading} >
                    {spinner}                
                </Modal>

                {loginBox}
                <Modal show={this.state.verifyLogin} >
                    {loggedinNotification}
                </Modal>
                <Modal show={this.state.createBoxClicked} modalClosed={this.closeCreateBoxClicked.bind(this)}>
                    {createAccountBox}
                </Modal>
                <Modal show={this.state.verifyCreatedAccount}>
                    {createdAccountNotification}
                </Modal>
            </Auxi>

        );
    }

}

export default withErrorHandler(LoginPage, axios );