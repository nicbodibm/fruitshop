import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Returns an Order Summary
class CreatedAccountNotification extends Component {
    componentWillUpdate() {
        console.log('[CreatedAccountNotification] WillUpdate');
    }

    render () {
        return (
            <Auxi>
                <h3>You have successfully created an account!</h3>
                <Button btnType="Success" clicked={this.props.clicked}>OK</Button>
            </Auxi>
        );
    }
}

export default CreatedAccountNotification;