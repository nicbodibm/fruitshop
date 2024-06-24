import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Returns notification when an ordered has been cancelled
class CancelOrderNotification extends Component {
    componentWillUpdate() {
        console.log('[CancelOrderNotification] WillUpdate');
    }

    render () {
        //Maps the products you selected in order to know the quantity, and price

        return (
            <Auxi>
                <h3>Order has been cancelled!</h3>

                <Button btnType="Success" clicked={this.props.purchaseCancelled}>OK</Button>
            </Auxi>
        );
    }
}

export default CancelOrderNotification;