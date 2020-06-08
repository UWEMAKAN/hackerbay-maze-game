import React from 'react';

import Layout from './containers/Layout/Layout';
import './App.module.css';
import lib from './lib/lib';

// const {
//   numberOfSprite, initOrigin, createCoordinate, generateCoordinates, factorial, getIndexesAfterIndexZero,
//   permutation, createIndexesOfPaths, distanceBetweenTwoCells, lengthOfPath, computeShortestPath
// } = lib();

function App() {
  return (
    <Layout helper={ lib() } />
  );
}

export default App;
