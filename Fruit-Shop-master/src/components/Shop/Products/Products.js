import React from 'react';

import classes from './Products.css';
import Product from './Product/Product';


// Products is a class that returns a list of products. 
const products = (props) => {

    return (
    <div className={classes.Products}>
        <div>
        <span className = {classes.quantity}>Quantity &nbsp;&nbsp;Price</span>
        </div>

        {props.controls.map(ctrl => (
            <Product 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.productAdded(ctrl.type)}
                removed={() => props.productRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} 
                product = {props.products[ctrl.type]}
                productsPrices = {props.productsPrices[ctrl.type]}/>
                
        ))}
                <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>

        <button 
            className={classes.OrderButton}
            disabled={props.purchasable}
            onClick={props.ordered}>Order Now</button>
    </div>
);
        }
export default products;