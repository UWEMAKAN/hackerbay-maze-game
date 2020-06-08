import React from 'react';

import classes from './Hamburger.module.css';

const hamburger = (props) => {
  return (
    <div className={ classes.Hamburger } onClick={ props.clicked }>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default hamburger;