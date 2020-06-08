import _ from 'underscore';

const lib = () => {
  const numberOfSprite = (width, height) => {
    return width === height ? width : Math.floor((height + width)/2);
  };
  
  const initOrigin = (width, height) => {
    return { x: Math.floor(width / 2), y: Math.floor(height / 2) };
  };
  
  const createCoordinate = (width, height) => {
    const coordinate = {};
    coordinate.x = Math.floor(Math.random() * width);
    coordinate.y = Math.floor(Math.random() * height);
    return coordinate;
  };
  
  const generateCoordinates = (width, height) => {
    const num = numberOfSprite(width, height);
    const origin = initOrigin(width, height);
    let coordinates = [];
    coordinates.push(origin);
    while (true) {
      const coordinate = createCoordinate(width, height);
      coordinates.push(coordinate);
      coordinates = _.uniq(coordinates);
      if (coordinates.length === num + 1) break;
    }
    return coordinates;
  };
  
  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };
  
  const getIndexesAfterIndexZero = (arr) => {
    const indices = [];
    if (arr.length === 0) return indices;
    for (let i = 1; i < arr.length; i++) {
      indices.push(i);
    }
    return indices;
  };
  
  const permutation = (arr) => {
    let ret = [];
    if (arr.length === 0) return ret;
    for (let i = 0; i < arr.length; i++) {
      let rest = permutation(arr.slice(0, i).concat(arr.slice(i + 1)));
  
      if(!rest.length) {
        ret.push([arr[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([arr[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  };
  
  const createIndexesOfPaths = (arr) => {
    const indexes = [];
    arr.forEach((element) => {
      const a = [0];
      indexes.push(a.concat(element));
    });
    return indexes;
  };
  
  const distanceBetweenTwoCells = (cell1, cell2) => {
    return Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y);
  };
  
  const lengthOfPath = (pathIndexes, coordinates) => {
    let pathLength = 0;
    for (let i = 0, j = 1; i < pathIndexes.length - 1; i++, j++) {
      const cell1 = coordinates[pathIndexes[i]];
      const cell2 = coordinates[pathIndexes[j]];
      pathLength += distanceBetweenTwoCells(cell1, cell2);
    }
    return pathLength;
  }
  
  const computeShortestPath = (allPathIndexes, coordinates) => {
    let minLength = Number.MAX_SAFE_INTEGER;
    let paths = [];
    allPathIndexes.forEach((pathIndexes) => {
      const l = lengthOfPath(pathIndexes, coordinates);
      if (l <= minLength) {
        paths.push(pathIndexes);
        if (l < minLength) {
          minLength = l;
          paths.splice(0, paths.length);
          paths.push(pathIndexes);
        }
      }
    });
    return { minLength, paths };
  };

  return   {
    numberOfSprite, initOrigin, createCoordinate, generateCoordinates, factorial, getIndexesAfterIndexZero,
    permutation, createIndexesOfPaths, distanceBetweenTwoCells, lengthOfPath, computeShortestPath
  };
}

export default lib;

