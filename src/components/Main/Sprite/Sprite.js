import React from 'react';

import classes from './Sprite.module.css';
import Mushroom from './Mushroom';

const sprite = (props) => {
  return (
    <div className={ classes.Sprite }>
      <Mushroom />
    </div>
  );
}

export default sprite;