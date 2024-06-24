import React from 'react';

import fruitLogo from '../../assets/images/fruitsunion.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={fruitLogo} alt="Logo" />
    </div>
);

export default logo;