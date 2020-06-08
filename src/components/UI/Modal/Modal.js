import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/withClass';
import Backdrop from '../Backdrop/Backdrop';
import WithClass from '../../../hoc/withClass';

const modal = (props) => {
  return (
    props.show ?
      <Aux>
        <Backdrop show clicked={ props.clicked }/>
        <WithClass Wrapper={ classes.Wrapper }>
          <div className={ classes.Modal }>
            { props.children }
          </div>
        </WithClass>
      </Aux> : null
  );
};

export default modal;
