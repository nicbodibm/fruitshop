import React from 'react';

import classes from './Product.css';

// Products is a class that returns a single product. 
const product = (props) => {
    let totalPrice = (props.productsPrices * props.product).toFixed(2)
    return(
    <div className={classes.Product}>
        <div className={classes.Label}>{props.label}(${props.productsPrices})</div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>Less</button>
        <button 
            className={classes.More} 
            onClick={props.added}>More</button>
        <span className = {classes.quantityValue}>{props.product}</span>
        <span className = {classes.totalPriceValue}>{totalPrice}</span>


    </div>
);
}
export default product;