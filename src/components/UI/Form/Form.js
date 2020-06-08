import React from 'react';
import classes from './Form.module.css';
import WithClass from '../../../hoc/withClass';
import Button from '../Button/Button';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aux';


const form = (props) => {

  return (
    props.show ?
      <Aux>
        <Backdrop show />
        <WithClass Wrapper={ classes.Wrapper }>
          <div className={ classes.Form }>
            <div classes={ classes.Heading }>{ props.heading }</div>
            <div className={ classes.Controls }>
              <input onChange={ (event) => props.handleChange(event) } name={ props.inputName } className={ classes.TextBox } type="text" 
                placeholder={ props.placeholder } required />
              <Button clicked={ props.submitForm } />
            </div>
          </div>
        </WithClass>
      </Aux> : null
  );
};

export default form;