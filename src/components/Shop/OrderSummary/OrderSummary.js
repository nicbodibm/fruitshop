import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Order Summary is a notification that shows the user what they ordered, and the price of their order.
class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render () {
        const productSummary = Object.keys( this.props.products )
            .map( igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.products[igKey]}
                    </li> );
            } );

        return (
            <Auxi>
                <h3>Your Order</h3>
                <ul>
                    {productSummary}
                </ul>
                <p><strong>Name: {this.props.account.name + " " + this.props.account.lastName}</strong></p>
                <p><strong>Address: {this.props.account.address}</strong></p>
                <p><strong>Total Price: {this.props.price.toFixed( 2 )}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxi>
        );
    }
}

export default OrderSummary;