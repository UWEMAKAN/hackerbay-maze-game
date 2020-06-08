import React from 'react';

import classes from './Time.module.css';

const time = (props) => {
  return (
    <div className={ classes.Time }>
      <span><strong>Time: </strong></span>
      <span><strong>{ props.time }</strong></span>
    </div>
  );
}

export default time;