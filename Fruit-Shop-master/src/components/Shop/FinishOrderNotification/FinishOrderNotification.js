import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Returns notification when an ordered has been completed.
class FinishOrderNotification extends Component {
    componentWillUpdate() {
    }

    render () {
        //Maps the products you selected in order to know the quantity, and price

        return (
            <Auxi>
                <h3>Order has been processed!</h3>

                <Button btnType="Success" clicked={this.props.purchaseContinued}>OK</Button>
            </Auxi>
        );
    }
}

export default FinishOrderNotification;