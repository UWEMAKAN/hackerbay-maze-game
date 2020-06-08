import React from 'react';

import Brand from './Brand/Brand';
import Moves from './Moves/Moves';
import Time from './Time/Time';
import classes from './Header.module.css';

const header = (props) => {
  return (
    <div className={ classes.Header }>
      <Brand />
      <Moves moves={ props.movesMade } />
      <Time time={ props.timeElapsed }/>
    </div>
  );
}

export default header;