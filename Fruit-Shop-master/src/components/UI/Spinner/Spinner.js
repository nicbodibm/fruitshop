import React from 'react';

import classes from './Spinner.css';
// Loads a spinner gif when an element is loading. 
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;