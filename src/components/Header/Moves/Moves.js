import React from 'react';

import classes from './Moves.module.css';

const moves = (props) => {
  return (
    <div className={ classes.Moves }>
      <span><strong>Moves: </strong></span>
      <span><strong>{ props.moves }</strong></span>
    </div>
  );
}

export default moves;