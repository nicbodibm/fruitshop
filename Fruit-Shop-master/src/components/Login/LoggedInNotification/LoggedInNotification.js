import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Returns an Order Summary
class LoggedInNotification extends Component {
    componentWillUpdate() {
        console.log('[LoggedInNotification] WillUpdate');
    }

    render () {
        //Maps the products you selected in order to know the quantity, and price
        return (
            <Auxi>
                <h3>You have successfully logged in!</h3>
                <Button btnType="Success" clicked={this.props.clicked}>OK</Button>
            </Auxi>
        );
    }
}

export default LoggedInNotification;