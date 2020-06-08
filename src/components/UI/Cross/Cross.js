import React from 'react';

import classes from './Cross.module.css';

const cross = (props) => {
  return (
    <div className={ classes.Cross } onClick={ props.clicked }>
      <span className={ classes.Forward }></span>
      <span className={ classes.Backward }></span>
    </div>
  );
}

export default cross;