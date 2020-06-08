import React from 'react';

import classes from './Main.module.css';
import WithClass from '../../hoc/withClass';
import Grid from '../../components/Main/Grid/Grid';

const main = (props) => {
  return (
    <div className={ classes.Main }>
      <WithClass Wrapper={ classes.Wrapper }>
        <Grid sprites={ props.sprites }
          keyPress={ props.keyPress } player={ props.player }
          gridDefs={ props.gridDefs } grid={ props.grid }/>
      </WithClass>
    </div>
  );
}

export default main;