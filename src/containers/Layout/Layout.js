import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Form from '../../components/UI/Form/Form';
import Lib from '../../lib/lib';
import Modal from '../../components/UI/Modal/Modal';

const {
  generateCoordinates, getIndexesAfterIndexZero,
  permutation, createIndexesOfPaths, computeShortestPath
} = Lib();

class Layout extends Component {

  constructor(props) {
    super(props);
    this.grid = React.createRef();
  };

  state = {
    shortestPath: {},
    coordinates: [],
    grid: { rows: 0, columns: 0 },
    moves: 0,
    time: 0,
    player: { top: -1000, left: -1000 },
    sprites: [],
    gameOver: false,
    width: 0,
    height: 0,
    widthInput: true,
    heightInput: false,
  };

  setPlayerAndSpritePosition = () => {
    const { width, height } = this.state;
    const coordinates = generateCoordinates(width, height);
    const sprites = coordinates.map((coordinate) => {
      const top = (coordinate.y * 32) + 8;
      const left = (coordinate.x * 32) + 8;
      return { top, left };
    });
    const player = sprites.splice(0, 1)[0];
    const indexesOfSprites = getIndexesAfterIndexZero(coordinates);
    const allPosiblePaths = permutation(indexesOfSprites);
    const allPathIndexes = createIndexesOfPaths(allPosiblePaths);
    const shortestPath = computeShortestPath(allPathIndexes, coordinates)
    this.setState({
      grid: {
        rows: this.state.height,
        columns: this.state.width
      },
      coordinates, player, sprites, shortestPath
    });
  };

  componentDidMount() {
    this.grid.current.focus();
  }

  getPlayerNewPosition = (dx, dy, prevState) => {
    let x = prevState.player.left + (dx);
    let y = prevState.player.top + (dy);
    const row = (prevState.grid.rows - 1) * 32;
    const column = (prevState.grid.columns - 1) * 32;
    if (x <= 0) x = 8;
    if (y <= 0) y = 8;
    if (x >= column) x = column + 8;
    if (y >= row) y = row + 8;
    return { x, y };
  };

  updateMoves = (x, y, prevState) => {
    return (prevState.player.top !== y || prevState.player.left !== x) ?
      ++prevState.moves : prevState.moves;
  };

  updateSprites = (x, y, prevState) => {
    return prevState.sprites.filter((sprite) => !(x === sprite.left && y === sprite.top));
  };

  update = (dx, dy) => {
    const prevState = this.state;
    const { x, y } = this.getPlayerNewPosition(dx, dy, prevState);
    const moves = this.updateMoves(x, y, prevState);
    const sprites = this.updateSprites(x, y, prevState);
    this.numberOfSprite = sprites.length;
    this.setState(() => {
      return {
        player: {
          left: x,
          top: y
        },
        moves,
        sprites
      };
    });
    if (this.numberOfSprite === 0) {
      this.setState(() => {
        return {
          gameOver: true
        };
      });
      return;
    }
  };

  keyPressHandler = (event) => {
    let dx = 0;
    let dy = 0;
    if (event.keyCode === 37){
      dx = -32;
    } else if (event.keyCode === 38) {
      dy = -32;
    } else if (event.keyCode === 39) {
      dx = 32;
    } else if (event.keyCode === 40) {
      dy = 32;
    }
    if (!this.state.gameOver) this.update(dx, dy);
  };

  widthInputHandler = (event) => {
    let input = 0;
    if (/\d+/.test(event.target.value) === false) {
      input = 5;
    } else {
      input = Number.parseInt(event.target.value);
      if (input < 3) input = 3;
      if (input > 10) input = 10
    }    
    this.setState({ width: input });
  };

  submitWidthHandler = () => {
    this.setState({ widthInput: false, heightInput: true });
  };

  heightInputHandler = (event) => {
    let input = 0;
    if (/\d+/.test(event.target.value) === false) {
      input = 5;
    } else {
      input = Number.parseInt(event.target.value);
      if (input < 3) input = 3;
      if (input > 10) input = 10
    } 
    this.setState({ height: input });
  };

  submitHeightHandler = () => {
    this.setState({ 
      heightInput: false
    });
    this.setPlayerAndSpritePosition();
  };

  closeModalHandler = () => {
    this.setState({ moves: 0, gameOver: false, widthInput: true, player: { top: -1000, left: -1000 }, grid: { rows: 0, columns: 0 } });
  }

  numberOfSprite = this.state.sprites.length;

  render() {
    return (
      <div className={ classes.Layout }>
        <Form placeholder="Width" inputName="width" show={ this.state.widthInput }
          heading="Enter grid width" handleChange={ this.widthInputHandler }
          submitForm={ this.submitWidthHandler } />
        <Form placeholder="Height" inputName="height" show={ this.state.heightInput }
          heading="Enter grid height" handleChange={ this.heightInputHandler }
          submitForm={ this.submitHeightHandler } />
        <Header movesMade={ this.state.moves } timeElapsed={ this.state.time } />
        <Main grid={ this.grid } sprites={ this.state.sprites }
          keyPress={ this.keyPressHandler } player={ this.state.player } 
          gridDefs={ this.state.grid }/>
        <Modal show={ this.state.gameOver } clicked={ this.closeModalHandler }>
          <div>
            <span>
              { 
                this.state.moves === this.state.shortestPath.minLength ?
                  "Success!!!" :
                  "Failed!!!"
              }
            </span>
          </div>
          <div><span>Your Moves: { this.state.moves }</span></div>
          <div><span>Optimal Moves: { this.state.shortestPath.minLength }</span></div>
        </Modal>
      </div>
    );
  };
}

export default Layout;