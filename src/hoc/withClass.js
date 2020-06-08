import React from 'react';

const withClass = (props) => {
  return (
    <div className={ props.Wrapper }>
      { props.children }
    </div>
  );
}

export default withClass;
