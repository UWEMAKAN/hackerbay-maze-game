import React from 'react';

import classes from './Player.module.css';
import SuperMario from './SuperMario';

const player = (props) => {

  return (

    <div style={ props.position } className={ classes.Player }>
      <SuperMario />
    </div>
  );
};

export default player;