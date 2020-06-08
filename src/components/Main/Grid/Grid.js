import React from 'react';

import classes from './Grid.module.css';
import Cell from './Cell/Cell';
import Sprite from '../Sprite/Mushroom';
import Player from '../Player/SuperMario';

const grid = (props) => {

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.gridDefs.columns}, 2rem)`,
    gridTemplateRows: `repeat(${props.gridDefs.rows}, 2rem)`,
  }

  const jellies = [];
  for (let i = 0; i < props.sprites.length; i++) {
    const jelly = <Sprite key={ i } position={ props.sprites[i] } />;
    jellies.push(jelly);
  }

  const cells = [];
  for (let i = 0; i < props.gridDefs.rows; i++) {
    const row = []
    for (let j = 0; j < props.gridDefs.columns; j++) {
      const key = `${i}${j}`;
      const cell = <Cell key={key} />
      row.push(cell);
    }
    cells.push(row);  
  }

const player = <Player position={ props.player } />;

  return (
    <div tabIndex="0" ref={ props.grid } onKeyUp={ (event) => props.keyPress(event) }
      style={ style } className={ classes.Grid }>
        { player }
        { jellies }
        { cells }
    </div>
  );
}

export default grid;